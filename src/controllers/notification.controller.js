const NotificationService = require("../services/notification.service")
const { Ok, SuccessResponse } = require("../core/success.response")

class NotificationController {

    listNotiByUser = async (req, res, next) => {
        return new SuccessResponse({
            metadata: await NotificationService.listNotiByUser(req.query)
        }).send(res)
    }

}


module.exports = new NotificationController()