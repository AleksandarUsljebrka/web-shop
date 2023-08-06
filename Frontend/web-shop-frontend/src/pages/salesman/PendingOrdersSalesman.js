import React from 'react'
import useService from '../../services/useService'

const PendingOrdersSalesman = () => {
    const {isLoading, statusCode, error, data, get} = useService();
  return (
    <div>PendingOrdersSalesman</div>
  )
}

export default PendingOrdersSalesman