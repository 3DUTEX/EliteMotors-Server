"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

const router = new (0, _express.Router)();

router.get('/example', (req, res) => res.send('Hello World!'));

exports. default = router;
