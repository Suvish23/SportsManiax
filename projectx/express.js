const express = require('express');
const dotenv = require('dotenv');

//load env vars

dotenv.config({ path: './config/config.env' });

const app = express();
app.get('/api', (req, res) => {
  let stat = 400;
  if (stat === 200) {
    res.status(stat).json({
      sucess: true,
      data: { id: 4, data: 'data returned successfully' },
    });
  } else {
    res.status(stat).json({ sucess: false });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server runing in ${process.env.NODE_ENV} node on port ${PORT}`)
);
