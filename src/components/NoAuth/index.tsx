function NoAuth() {
    return (
        <div className={"not-found flex flex-col w-full items-center pt-[50px] pb-[20px]"}>
            <h1 className={"text-center text-[#666] dark:text-[#ccc] text-8xl font-bold py-[20px]"}>403</h1>
            <h2 className={"text-2xl text-[#222] dark:text-[#aaa] font-bold mb-[10px]"}>Oops! Forbidden Page.</h2>
            <p className={"max-w-[460px] px-[15px] text-[#777777] text-center leading-[1.8]"}>
                The page you are looking for should be authenticated first.
            </p>
        </div>
    )
}

export default NoAuth
