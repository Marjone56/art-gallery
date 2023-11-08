const router = require("express").Router()
const bcrypt = require ("bcrypt");
const UserModel = require("../models/user");

//update
router.put("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch (err){
                return res.status(500).json(err)
            }
        }

        try{
            const user = await UserModel.findByIdAndUpdate(req.params.id, 
                {$set: req.body
                });
                res.status(200).json("Account updated")
        } catch (err){
            return res.status(403).json("You can only update your account")
        }
    } else{
        return res.status(403).json("You can only update your account")
    }
})
//delete

router.delete("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
                await UserModel.findByIdAndDelete(req.params.id)
                res.status(200).json("Account updated")
        } catch (err){
            return res.status(403).json("You can only delete your account")
        }
    } else{
        return res.status(403).json("You can only delete your account")
    }
})


//get
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await UserModel.findById(userId)
        : await UserModel.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;