import React from 'react'
import AppLayout from '@/layout/app-layout'
import AccountLayout from '@/layout/account-layout'


function Account() {
    return (
        <AppLayout>
            <div> 
                <AccountLayout />
            </div>
        </AppLayout>
    )
}

export default Account