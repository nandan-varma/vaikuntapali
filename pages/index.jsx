import Link from "next/link"

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export default function Index(){
  return (
    <>
    <Link href={"/vsAI"}>Play with AI</Link>
    <br></br><br></br>
    <Link href={"/"+revisedRandId()}>Play with friend</Link>
    </>
  )
}