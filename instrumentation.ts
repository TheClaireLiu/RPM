import connect from '@/config/db'

export async function register() {
    await connect()
}