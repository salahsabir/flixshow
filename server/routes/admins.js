const router = require("express").Router();
const adminModel = require('../models/Admin')
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken")


//UPDATE

router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await adminModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });

//DELETE

router.delete("/id/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await adminModel.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
    try {
      const user = await adminModel.findById(req.params.id);
      const {password, ...info} = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  const query = req.query.new
  if (req.user.isAdmin) {
    try {
      const users = query ? await adminModel.find().sort({_id:-1}).limit(5) : await adminModel.find()
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can are not allowed to see all users");
  }
});

//GET USER STATS

router.get("/stats", async (req, res)=>{
  try{
    const data = await adminModel.aggregate([
      {
        $project:{
          month:{$month:"$createdAt"}
        }
      },{
        $group:{
          _id:"$month",total:{$sum:1}
        }
      }
    ]);
    res.status(200).json(data)
  }catch(err){
    res.status(500).json(err)
  }
})

module.exports = router