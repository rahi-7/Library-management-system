import React from "react"
import "./BookSubjects.css"

interface BookSubjectProps {
    subjects: string[]
}

export const BookSubjects:React.FC<BookSubjectProps> = ({subjects}) => {

    return (
        <div className="book-subjects">
            <h3>Book Subjects: </h3>
            <div className="book-info-subjects-box">
                {subjects.map((subject, index) => {
                    if (index !== subjects.length -1) {
                        return <p className="bok-info-subject" key={subject}>{subject},</p>
                    } else {
                        return <p className="bok-info-subject" key={subject}>{subject}</p>
                    }
                    })}
            </div>
        </div>
    )
}