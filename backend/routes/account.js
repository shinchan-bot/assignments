const router = require('express').Router();

const {authMiddleware} = require("../middleware/middleware");
const {Account} = require("../db/index");
const { default: mongoose } = require('mongoose');

router.use("/balance", authMiddleware, async (req, res) => {
    const id = req.id;
    const account = await Account.findOne({userId:id});
    if(account){
        res.status(200).json({balance:account.balance});
    }else{
        res.status(403).json({});
    }
})

router.use("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    await session.startTransaction();
    const {amount, to} = req.body;
    const targetUser = await Account.findOne({userId:to});
    console.log(targetUser, "<--------")
    const id = req.id;
    const user = await Account.findOne({userId:id});
    if(user.balance >= amount && targetUser){
        await Account.updateOne(
            {
                userId:id
            },{
                $set:{balance:user.balance-amount}
            }
        )
        await Account.updateOne(
            {
                userId:to
            },{
                $set:{balance:targetUser.balance+amount}
            }
        )
        session.commitTransaction();
        res.status(200).json({
            msg:"Transfer successful"
        })
    }else{
        await session.abortTransaction();
        res.status(403).json({
            msg:"Invaid request or low balance"
        })
    }
})



module.exports = router;