import fs from 'fs'
import { join } from 'path'
//import { find } from 'lodash'

const pveDirectory = join(process.cwd(), 'content/pve')
const dataDirectory = join(process.cwd(), 'data')
export function getPveSlugs(type) {
    const path = join(pveDirectory, type)
    return fs.readdirSync(path)
}

export function getPveBySlug(slug, type, fields = []) {
    //const realSlug = slug.replace(/\.md$/, '')
    const path = join(pveDirectory, type);
    const fullPath = join(path, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    else { //md file exists
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const items = {}

        // Ensure only the minimal needed data is exposed
        fields.forEach((field) => {
            if (field === 'slug') {
                items[field] = realSlug
            }
            if (field === 'content') {
                items[field] = content
            }

            if (data[field]) {
                items[field] = data[field]
            }
        })

        return items
    }
}

export function getAllPve(type, fields = []) {
    const slugs = getPveSlugs(type);
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
    return posts
}
export function getData(type) {
    const path = join(dataDirectory, type)
    return JSON.parse(fs.readFileSync(path, 'utf8'))      
}
export function getItemByHash(hash, type) {
    const items = getData(type)
    return items.find((data) => data.hash == hash );
}