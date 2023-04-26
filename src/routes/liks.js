const express = require('express');
const router = express.Router();
const { promisify } = require('util');

const pool = require('../database')
const { isloggerIn } = require('../lib/auth')

router.get('/add', isloggerIn, (req, res) =>{
    res.render('links/add')
});

router.post('/add', isloggerIn, async (req, res) => {
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links SET ?', [newLink]);
    await req.flash('success', 'Exitoso');
    res.redirect('/links')
});

router.get('/', isloggerIn, async (req, res) => {
    const links  = await (pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]));
    res.render('links/list', {links})
});

router.get('/delete/:id', isloggerIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', isloggerIn, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);   
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isloggerIn, async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
});

module.exports = router; 