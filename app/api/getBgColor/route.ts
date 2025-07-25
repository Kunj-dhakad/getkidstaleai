import { NextResponse } from "next/server";
import { dbConnection } from '../../../lib/db';

export async function GET() {

  try {
    const connection = await dbConnection();
    const [result] = await connection.execute(`SELECT * FROM bg_text_code`)
    console.log(result)
    return NextResponse.json({ data: result })

  } catch (e) {
    console.error(e)
    return NextResponse.json({ "error": e })
  }



}