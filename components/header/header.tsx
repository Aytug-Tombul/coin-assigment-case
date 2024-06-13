import Link from "next/link"
import classes from "./header.module.css"

export default function HeaderMain(){
    
    return(
        <header className={classes.header}>
          <Link href="/" className={classes.title}>
          Coin tracker
          </Link>
          
      </header>
    )
}