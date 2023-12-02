const notificationModel = require("../models/notification.model")

const pushNotiToSystem = async ({
    type = "SHOP-0001",
    receivedId = 1,
    noti_content = "",
    senderId = 1,
    options = {}
}) => {

    const newNoti = await notificationModel.create({
        noti_type: type,
        noti_content,
        noti_receivedId: receivedId,
        noti_senderId: senderId,
        noti_options: options
    })

    return newNoti
}


const listNotiByUser = async ({
    userId = 1,
    type = "All",
    isRead = true
}) => {
    const match = {
        noti_receivedId: userId
    }

    if (type !== "All") {
        match["noti_type"] = type
    }

    return await notificationModel.aggregate([
        {
            $match: match
        },
        {
            $project: {
                noti_type: 1,
                noti_senderId: 1,
                noti_receivedId: 1,
                noti_content: 1,
                noti_options: 1,
                createAt: 1
            }
        }
    ])
}


module.exports = {
    pushNotiToSystem,
    listNotiByUser
}