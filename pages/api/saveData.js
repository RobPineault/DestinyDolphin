import { join } from 'path'
const fs = require('fs')

export default async function saveData(req, res) {
    const path = join(process.cwd(), 'data/weapons');
    const data = req.body
    try {
        fs.writeFileSync(path, JSON.stringify(data))
        res.status(200)
    } catch (err) {
        console.error(err)
        res.status(400)
    }

} 