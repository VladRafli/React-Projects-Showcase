import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";
import './css/MainMenu.css';

function CountProject() {
    let count = 0;
    document.querySelectorAll('.project').forEach(() => {
        count++;
    })
    return count;
}

export default function MainMenu() {
    const [statusimg, setStatusimg] = useState('https://img.shields.io/nodeping/status/jkiwn052-ntpp-4lbb-8d45-ihew6d9ucoei?down_color=red&down_message=offline&up_color=orange&up_message=checking');
    const [status, setStatus] = useState('');
    const [count, setCount] = useState(0);
    useEffect(() => {
        // Set Project Count and Starting Server Status
        setCount(CountProject());
        setStatus('Checking...');
        // Check Server Avability
        const socket = io('ws://localhost:5001');
        socket.on('connect_error', () => {
            console.error('Oof! Server is off for a moment, check the server status then reload the page');
            console.log(`SocketStatus = ${socket.connected}`);
            setStatus('Offline');
            setStatusimg('https://img.shields.io/nodeping/status/jkiwn052-ntpp-4lbb-8d45-ihew6d9ucoei?down_color=red&down_message=offline&up_color=red&up_message=offline');
            socket.disconnect();
        });
        socket.on('connect', () => {
            console.log('Server is on and good!');
            console.log(`SocketStatus = ${socket.connected}`);
            setStatus('Online');
            setStatusimg('https://img.shields.io/nodeping/status/jkiwn052-ntpp-4lbb-8d45-ihew6d9ucoei?down_color=red&down_message=offline&up_color=green&up_message=online');
        });
        socket.on('disconnect', () => {
            console.error('Oof! Client connection to server seems disconected...');
            console.log(`SocketStatus = ${socket.connected}`);
            setStatus('Offline');
            setStatusimg('https://img.shields.io/nodeping/status/jkiwn052-ntpp-4lbb-8d45-ihew6d9ucoei?down_color=red&down_message=offline&up_color=red&up_message=offline');
        });
    }, []);
    return (
        <>
            <main className="main_menu">
                <section className="hero_banner">
                    <section className="banner_wrapper">
                        <h1 className="banner_title">Raf-Fly React Projects</h1>
                        <p className="banner_text">Expect projects shown in this pages. And its always React Project with Express Server on Background</p>
                    </section>
                </section>
                <section className="information_section">
                    <h1 className="info_header">App Info</h1>
                    <section className="app_info">
                        <div className="server_info">
                            <p>Server Status</p>
                            <img src={statusimg} alt={status}/>
                        </div>
                        <div className="project_info">
                            <p>Numbers of projects</p>
                            <p>{count}</p>
                        </div>
                    </section>
                </section>
                <section className="project_showroom">
                    <h1 className="showcase_header">Projects</h1>
                    <section className="project_list">
                        <article className="project">
                            <h1 className="project_name">Project Name</h1>
                            <img src="#" alt="" className="project_screenshoot"/>
                            <p className="project_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore porro aperiam, esse consequatur libero cumque eveniet animi impedit placeat assumenda?</p>
                            <Link to="#">Go to page</Link>
                        </article>
                    </section>
                </section>
            </main>
            <footer>
                Created with ❤ by Rafli Jaskandi.
            </footer>
        </>
    );
}
