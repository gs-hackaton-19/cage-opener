import express from 'express';
import ip from 'ip';
const piblaster = require('pi-blaster.js');
const router = express.Router();

const app = express();
const port = process.env.PORT || 3002;
const pin = 10;
const rangeMin = 30;
const rangeMax = 90;

console.dir(ip.address());

router.get('/cage/open', (req,res) => {
  open();
  return res.json({status: 'open'});
})


router.get('/cage/close', (req,res) => {
  close();
  return res.json({status: 'close'});
})

app.use('/', router);

function range(percent){
  if(typeof percent === 'boolean' && !percent){
    return 0;
  }
  return 0.002 * percent + 0.05;
}

function open(){
  console.log('open')
  piblaster.setPwm(pin, range(rangeMax));
}

function close(){
  console.log('close')
  piblaster.setPwm(pin, range(rangeMin));
}
 
app.listen(port, () => console.log('listening on port ' + port));