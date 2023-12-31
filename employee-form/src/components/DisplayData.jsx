import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useRef, useState } from 'react'
import './display.css'

function DisplayData() {

    const [code, setCode] = useState()
    const [gender, setGender] = useState()
    const codeRef = useRef()
    const pdfRef = useRef()
    const [empData, setEmpData] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        // setCode(codeRef.current.value)
        handleGetRequest()
    }

    const handleGetRequest = () => {
        fetch(`https://back-end-form.vercel.app/getEmp/${codeRef.current.value}`)
            .then(res => res.json())
            .then((data) => {
                setEmpData(data)
                setCode(data.code)
            })
    }


    const handlePrint = () => {
        const capture = pdfRef.current;
        html2canvas(capture,{useCORS: true}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4',true);
            const compWidth = doc.internal.pageSize.getWidth()
            const compHeight = doc.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(compWidth/imgWidth, compHeight/imgHeight)
            doc.addImage(imgData, 'PNG', 0, 0, imgWidth*ratio, imgHeight*ratio)
            doc.save(`${empData.code}.pdf`);
        })
    }






    return (
        <>
            <form className='flex flex-col md:flex-row gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg p-8 my-6'>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Code : </span>
                    </label>
                    <input ref={codeRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="button flex items-center mt-8 justify-center w-full">
                    <button onClick={handleSubmit} type='submit' className="btn btn-accent px-8">Search</button>
                </div>
            </form>
            {code ? <><form ref={pdfRef} id='print' className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-2 md:p-8 my-6 '>
                <div className='area flex-col-reverse md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input readOnly value={empData.name} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="photoArea">
                        <img src={empData.url} alt="" />
                    </div>

                </div>
                <div className='area flex flex-col md:flex-row w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">License Number :</span>
                        </label>
                        <input readOnly value={empData.guarantee} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Father's Name</span>
                        </label>
                        <input readOnly value={empData.fatherName} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                </div>
                <div className='area flex flex-col md:flex-row w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Experience</span>
                        </label>
                        <input readOnly value={empData.experience} type="number" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Code</span>
                        </label>
                        <input readOnly value={empData.code} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                </div>


                <div className='area flex flex-col md:flex-row w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Gender :</span>
                        </label>
                        <input readOnly value={empData.gender} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Date Of Birth</span>
                        </label>
                        <input readOnly value={empData.dob} type="date" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className='area flex flex-col md:flex-row w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Address :</span>
                        </label>
                        <textarea value={empData.address} readOnly className="textarea textarea-accent" placeholder="Address  .  .  ."></textarea>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Date Of Joining :</span>
                        </label>
                        <input value={empData.join} type="date" placeholder="Type here" className="input input-bordered w-full" readOnly />
                    </div>
                </div>


            </form><div className="button flex items-center mt-8 justify-center w-full">
                    <button onClick={handlePrint} type='submit' className="btn btn-accent px-8">Print</button>
                </div></> : <></>}


        </>
    )
}

export default DisplayData