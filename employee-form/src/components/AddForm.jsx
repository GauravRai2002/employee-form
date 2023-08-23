import React, { useState } from 'react'
import { useRef } from 'react'
import { Cloudinary } from "@cloudinary/url-gen";


function AddForm() {
    const nameRef = useRef()
    const fatherNameRef = useRef();
    const addressRef = useRef();
    const [gender, setGender] = useState(null);
    const guarnterRef = useRef();
    const [imageSource, setImageSource] = useState()
    const dobRef = useRef();
    const expRef = useRef();
    const codeRef = useRef();
    const photoRef = useRef();
    const CLOUD_NAME = 'dy4rzochf'
    const API_KEY = '648155248577273'
    const API_SECRET = '9sViz_LtXOAMoAHaQtBXgIRiSWg'
    const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });
    const [error, setError] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [url, setUrl] = useState();

    const imageProcess = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image)
        reader.onloadend = () => {
            setImageSource(reader.result)
        }
    }

    const handleSubmit = (e) => {
        setUploaded(false)
        e.preventDefault();


        if (nameRef.current.value && fatherNameRef.current.value && addressRef.current.value && gender && dobRef.current.value && expRef.current.value && codeRef.current.value && photoRef.current.value && guarnterRef.current.value) {
            imageProcess(photoRef.current.files[0])
            uploadImg()
        }
        else {
            setError(true);
        }


    }

    const uploadImg = () => {
        try {
            fetch('https://back-end-form.vercel.app/upload', {
                method: 'POST',
                body: JSON.stringify({
                    data: imageSource
                }),
                headers: { 'Content-type': 'application/json' }
            }).then((result) => {
                return result.json()
            }).then((data) => {
                finalUpload(data.res)
            }).catch((err) => {
                console.log(err)
            })
        } catch {
            console.log(error)
        }
    }

    const finalUpload = (url) => {
        const data = {
            'name': nameRef.current.value.toString(),
            'fatherName': fatherNameRef.current.value.toString(),
            'guarantee': guarnterRef.current.value.toString(),
            'address': addressRef.current.value.toString(),
            'gender': gender.toString(),
            'experience': expRef.current.value.toString(),
            'code': codeRef.current.value.toString(),
            'photo': photoRef.current.value.toString(),
            'dob': dobRef.current.value.toString(),
            'url': url
        }

        setUrl(url)
        setError(false)
        fetch('https://back-end-form.vercel.app/add', {
            method: 'POST',
            body: JSON.stringify(data),
            // headers: {
            //     "Content-type": "application/json"
            // }
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(()=>{
            setUploaded(true)
        })

    }

    return (
        <>
            {error ? <><div className="alert alert-error md:w-2/3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>ERROR ! Fill All Details !</span>
            </div></> : <></>}
            {uploaded ? <><div className="alert alert-success md:w-2/3 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>SUCCESS ! All Details Uploaded Successfully !</span>
            </div></> : <></>}

            <form className='flex flex-col gap-8 w-full h-fit md:w-2/3  mx-auto border-2 border-teal-600 rounded-lg py-8 px-2 my-6'>
                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Full Name :</span>
                        </label>
                        <input ref={nameRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Father's Name :</span>
                        </label>
                        <input ref={fatherNameRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">License Number :</span>
                        </label>
                        <input ref={guarnterRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Code :</span>
                        </label>
                        <input ref={codeRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Experience :</span>
                        </label>
                        <input ref={expRef} type="number" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Date Of Birth :</span>
                        </label>
                        <input ref={dobRef} type="date" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>


                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-4 md:px-9'>
                    <div className="wrapper w-full flex items-center justify-center md:gap-18 gap-4">
                        <div className="w-full">Gender :</div>
                        <div className="form-control w-fit">
                            <label className="label cursor-pointer">
                                <span className="label-text">Female</span>
                                <input onClick={() => setGender('Female')} id='female' value='Female' type="radio" name="radio-10" className="radio checked:bg-blue-500 mx-4" />
                            </label>
                        </div>
                        <div className="form-control w-fit">
                            <label className="label cursor-pointer">
                                <span className="label-text">Male</span>
                                <input onClick={() => setGender('Male')} id='male' value='Male' type="radio" name="radio-10" className="radio checked:bg-red-500 mx-4" />
                            </label>
                        </div>


                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Address :</span>
                        </label>
                        <textarea ref={addressRef} className="textarea textarea-accent" placeholder="Address  .  .  ."></textarea>
                    </div>
                </div>

                <div className='area flex-col md:flex-row flex w-full items-center justify-center gap-6 h-fit px-9'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo :   </span>
                        </label>
                        <input ref={photoRef} type="file" accept="image/png, image/jpeg" className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                    </div>
                    <div className="button flex items-center mt-8 justify-center w-full">
                        <button onClick={handleSubmit} type='submit' className="btn btn-accent px-8">Subimt Form</button>
                    </div>
                </div>


            </form>
        </>
    )
}

export default AddForm