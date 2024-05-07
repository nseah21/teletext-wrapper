import Image from 'next/image';

export default function Credits() {
    return (
        <div>
            <div className="super-secret-text p-4 text-black">I am a struggling student looking for a job...</div>
            <div className="font-sans text-[16px] tracking-normal p-4 flex">
                <div className='m-1'>Built by Nicholas</div>
                <div className='m-1'>
                    <a href="https://github.com/nseah21">
                        <Image src="/images/icons8-github.svg" alt="An icon of the GitHub logo" height={36} width={36} />
                    </a>
                </div>
                <div className='m-1'>
                    <a href="https://linkedin.com/in/seah-shau-chung-nicholas">
                        <Image src="/images/icons8-linkedin.svg" alt="An icon of the LinkedIn logo" height={36} width={36} />
                    </a>
                </div>
            </div>
        </div>
    );
}