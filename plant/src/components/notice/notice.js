import React from 'react';
import { Fragment } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ButtonPlantr } from '../buttonPlantr/buttonPlantr'
import { Link } from 'react-router-dom';
import { IoLeaf } from 'react-icons/io5'
import { AiOutlineHome } from 'react-icons/ai'
import { RiTruckFill } from 'react-icons/ri'
import './notice.css'

export const Notice = ({ header, buttons, bg, children }) => {
    return (
        <div className={bg !== false && 'noticeContainer'}>
            <Container>
                <Row className={`noticeRow ${bg !== false ? 'noticeSpacingCenter' : 'noticeSpacingTop'}`}>
                {children}
                    {header && <h4 className="noticeHeader">{header}</h4>}
                    <div className="noticeButtonContainer">
                        {buttons.map((b) => (
                            <Fragment>
                                {b.type === 'link' ?
                                    <Link to={b.link}>
                                        <p>{b.text}</p>
                                    </Link>
                                    :
                                    <div className="buttonSpacing">
                                        <Link to={b.link}>
                                            <ButtonPlantr>
                                                {b.icon === 'home' ? <AiOutlineHome />: b.icon === 'shipping' ? <RiTruckFill /> : <IoLeaf />}
                                                {` ${b.text}`}
                                                </ButtonPlantr>
                                        </Link>
                                    </div>
                                }
                            </Fragment>
                        ))}
                    </div>
                </Row>
            </Container>
        </div>
    )
}
