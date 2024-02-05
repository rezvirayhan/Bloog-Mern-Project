export const test = (req, res) => {
    res.json({ massage: "Api Running On User Model" })
}

export const updateUser = (req, res, next) => {
    console.log(req.user);
}

