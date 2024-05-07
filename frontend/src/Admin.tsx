

const Admin = () => {


    return (
        <div className="flex min-h-screen">
            <aside className="w-full p-6 sm:w-60 dark:bg-gray-50 dark:text-gray-800 mt-30">
                <nav className="space-y-8 text-sm">
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Approve Tutor</h2>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">Education Center</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">Add New</a>
                            <a rel="noopener noreferrer" href="#">Update</a>
                            <a rel="noopener noreferrer" href="#">Remove</a>
                        </div>
                    </div>
                </nav>
            </aside>

            <div className="flex-1 justify-center items-center"> 
                <div className="w-full max-w-4xl p-6 bg-white rounded-xl">
                    <div className="mt-30 font-semibold tracking-widest">
                        <p className="bg-black text-white rounded-2xl p-3 inline-block">APPROVE TUTOR</p>
                    </div>   

                    <div className="text-lg page-font-color">
                        <p>Test</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;

