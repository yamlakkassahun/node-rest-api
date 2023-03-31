import mongoose from "mongoose"

export default async () => {
    const connection = mongoose.connection
    connection.on('connected', () => {
        console.log('Mongo Connection Established')
    })
    connection.on('reconnected', () => {
        console.log('Mongo Connection Reestablished')
    })
    connection.on('disconnected', () => {
        console.log('Mongo Connection Disconnected')
    })
    connection.on('close', () => {
        console.log('Mongo Connection Closed')
    })
    connection.on('error', (error: Error) => {
        console.log('Mongo Connection ERROR: ' + error)
    })

    const run = async () => {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL_LOCAL, {
            keepAlive: true,
        })
    }

    run().catch((error) => console.error(error))
}