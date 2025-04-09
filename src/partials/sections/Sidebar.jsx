import React from 'react'
import LogotypeLink from '../components/LogotypeLink'
import NavLinks from './NavLink'

const Sidebar = () => {
    return (
        <section className="sidebar">
            <LogotypeLink />
            <NavLinks />
        </section>
    )
}

export default Sidebar