import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { Logout, reset } from "../features/AuthSlice"

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    const Exit = () => {
        dispatch(Logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <div>
            <aside className="menu pl-2 has-shadow">
                <p className="menu-label">
                    General
                </p>
                <ul className="menu-list">
                    <li><NavLink to={"/dashboard"}><IoHome /> Dashboard</NavLink></li>
                    <li><NavLink to={"/products"}><IoPricetag /> Products</NavLink></li>
                </ul>
                {user && user.role === 'admin' && (
                    <div>
                        <p className="menu-label">
                            Administration
                        </p>
                        <ul className="menu-list">
                            <li><NavLink to={"/users"}><IoPerson /> users</NavLink></li>
                        </ul>
                    </div>
                )}
                <p className="menu-label">
                    Setting
                </p>
                <ul className="menu-list">
                    <li>
                        <button className="button is-white" onClick={Exit}><IoLogOut /> Logout</button>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default SideBar