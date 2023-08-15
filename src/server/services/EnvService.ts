import { parse, stringify } from "envfile"
import { closeSync, existsSync, openSync, readFile, readFileSync, writeFileSync } from "fs"
import path from "path"

class EnvService {
    filePath = path.join(process.cwd(), '.env')

    get(filePath: string, use_parse = false) {
        const envPath = path.join(filePath, '.env')
        return new Promise((resolve) => {
            readFile(envPath , 'utf-8', function(err, data){
                if (!err) resolve(use_parse ? parse(data) : data)
                resolve(null)
            })
        })
    }

    read() {
        if (!existsSync(this.filePath)) {
            closeSync(openSync(this.filePath, 'w'))
        }

        return parse(readFileSync(this.filePath, 'utf-8'))
    }


    write(data: Record<string, string | number>) {
        const parseEnv = this.read()

        console.log(stringify({
            ...parseEnv,
            ...data
        }))

        writeFileSync(this.filePath, stringify({
            ...parseEnv,
            ...data
        }))

        return true
    }

}

export default new EnvService()
