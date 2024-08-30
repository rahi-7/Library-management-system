import { LoanRecord } from "../../../../models/LoanReacord"
import "./ProfileLoanRecord.css"
import React from "react"

interface ProfileLoanRecordProps {
    record: LoanRecord
}

export const ProfileLoanRecord:React.FC<ProfileLoanRecordProps> = ({record}) => {
    return (
        <div className="profile-record">
            <h4>Title: {record.item.title}</h4>
            <h4>Status: {record.status === "AVAILABLE" ? "RETURNED" : "LOANED"}</h4>
            <p>Return by Date: {new Date(record.loanedDate).toDateString()}</p>
            <p>Return by Date: {new Date(record.dueDate).toDateString()}</p>
            {record.returnedDate && <p>Date Returned: {new Date(record.returnedDate).toDateString()}</p>}
        </div>
    )
}