import React from 'react'
import ReactLoading from 'react-loading'
import { Col, Row } from 'antd'
import logo from '../../assets/image/loading/LogoSg.png'
import styles from './LoadingDisplay.module.css'

interface LoadingDisplayLastProps {
    loading: boolean
}

const LoadingDisplay: React.FunctionComponent<LoadingDisplayLastProps> = ({
    loading = false
}) => {
    return loading === true ? (
        <div
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
                // zIndex: 1200,
                zIndex: 1200000,
                top: 0,
                left: 0
            }}
        >
            <Col>
                <div className={styles.logoanima}>
                    <Row
                        style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            style={{
                                width: '285px',
                                height: '85px'
                            }}
                            src={logo}
                            draggable={false}
                            width="auto"
                        />
                    </Row>
                </div>
                <div
                    style={{
                        marginTop: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <span
                        style={{ marginRight: 5, fontSize: 25, color: '#000' }}
                    >
                        Loading
                    </span>

                    <span>
                        {' '}
                        <ReactLoading type={'bubbles'} color="#000" />
                    </span>
                </div>
            </Col>
        </div>
    ) : null
}

export default LoadingDisplay
