const express = require('express');
const router = express.Router();
const path =require('path');

//^ this symbol means it must begin with a something and $ means end with something 
//and bracket with question mark means it need not be necessary and . means any character
router.get(/^\/($|index(\.html)?)/, (req, res) => {
    res.sendFile(path.join(__dirname,'..','..', '01-custom-web-server', 'views', 'index.html')); 
})
//instead of the complicated above way we can use the array and list out all we want
router.get(['/new-page.html', '/new-page'], (req,res) => {
    //You can use both path.join or just describe the path like here
    res.sendFile(path.join(__dirname,'..','..', '01-custom-web-server', 'views', 'new-page.html'));
})

router.get(/\/old-page(\.html)?/ , (req, res) => {
    res.redirect(301, 'new-page.html') // 302 by default
});

module.exports = router;