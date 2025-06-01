"use client"
import CountUp from 'react-countup';

export default function StatisticsCount () {

    return (
        <div className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-12 px-4 sm:px-10 lg:px-20">
            <div className="text-5xl font-bold text-green-700 flex flex-col items-center">
                <CountUp end={50} duration={4} suffix="+" />
                <div className='text-lg mt-2'>Happy Clients</div>
            </div>
            <div className="text-5xl font-bold text-green-700 flex flex-col items-center">
                <CountUp end={30} duration={4} suffix="+" />
                <div className='text-lg mt-2'>Positive Reviews</div>
            </div>
            <div className="text-5xl font-bold text-green-700 flex flex-col items-center">
                <CountUp end={98} duration={4} suffix="%" />
                <div className='text-lg mt-2'>Satisfaction Rate</div>
            </div>
        </div>
    );
}
