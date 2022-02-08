import React from 'react'

const Capitalize = ({ children }: { children?: string }) => <span style={{ textTransform: 'capitalize', fontFamily: 'inherit' }}>{children} </span>

export default Capitalize
