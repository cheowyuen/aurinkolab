import Logo from "./Logo";

function Tutors() {
    const tutors = [
        {image: "/src/assets/tony.jpeg", name: "Tony", email: "tony.poppel@gmail.com", completedVehicles: "300", isEstimate: true, isCertified: true, tutorId: 1},
        {image: "/src/assets/olga.jpeg", name: "Olga", email: "olgakairova@gmail.com", completedVehicles: "2", isEstimate: false, isCertified: true, tutorId: 2},
    ]

    return (
        <div className="parent-container">
            <div className='tutors-title' data-testid="event-details-title">
                <p>Tutors</p>
            </div>

            <div className="flex justify-center mx-auto pt-12 pb-6 bg-gray-100 w-full">
                <div className="flex flex-col items-center">
                    <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 mx-auto">Join us as a tutor</h1>
                    <button className="button-tiny">Register</button>
                </div>
            </div>

            <div className="w-full px-10 pt-10 events-page bg-gray-100">
                <div className="lg:flex md:flex sm:flex items-center flex-wrap justify-around">
                    {tutors.map((tutor) => (
                        <div className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                            <div className="rounded overflow-hidden shadow-md bg-white">
                                <div className="absolute -mt-20 w-full flex justify-center">
                                    <div className="h-32 w-32">
                                        <img src={tutor.image} alt={tutor.name} className="rounded-full object-cover h-full w-full shadow-md" />
                                    </div>
                                </div>
                                <div className="mt-16">
                                    <h1 className="font-bold text-3xl text-center mb-1 px-6">{tutor.name}</h1>
                                    <p className="text-center text-gray-600 text-base pt-3 font-normal px-6">Completed {tutor.completedVehicles}{tutor.isEstimate ? "+" : ""} multimodal green energy vehicles.</p>
                                    <div className="w-full flex justify-center pt-5 pb-5 px-6 text-base text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-mail mr-2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                            <polyline points="22,6 12,13 2,6"></polyline>
                                        </svg>
                                        {tutor.email}
                                    </div>
                                    {tutor.isCertified ?
                                        (<div className="text-base certified">
                                            <div className="logo-container"><Logo width="36px" height="36px" /></div>
                                            AurinkoLab-certified tutor
                                        </div>)
                                    :
                                        (<div className="text-base certified-empty">
                                            <div className="empty-container"></div>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tutors;
