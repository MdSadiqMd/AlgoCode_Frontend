import Image from 'next/image';
import icon from '../../app/icon.png';

const navigation = {
    connect: [
        {
            name: 'Twitter',
            href: 'https://x.com/Md_Sadiq_Md',
        },
        {
            name: 'Github',
            href: 'https://github.com/MdSadiqMd',
        },
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/in/sadiq-mohammad-2b256b227/',
        },
    ],
    company: [
        { name: 'Blogs', href: 'https://mdsadiqmd.hashnode.dev/' },
        { name: 'Report a Bug', href: '/report' },
    ],
};

const Footer = () => {
    return (
        <footer
            aria-labelledby="footer-heading"
            className="font-inter w-full py-2 bg-white dark:bg-[#020817]"
        >
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between lg:flex-row">
                    <div className="space-y-8">
                        <Image
                            priority={true}
                            unoptimized={true}
                            width={100}
                            height={40}
                            src={icon}
                            alt="logo"
                            className="h-7 w-auto"
                        />
                        <p className="text-md max-w-xs leading-6 text-gray-600 dark:text-[#CCFFFF]">
                            Boost your Building. Anywhere, anytime in the cloud
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-600  dark:text-[#CCFFFF]">
                            <div>Made with ❤️ by <span>Sadiq Mohammad.</span></div>
                        </div>
                    </div>
                    {/* Navigations */}
                    <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
                        <div className="md:mt-0">
                            <h3 className="text-sm font-semibold leading-6 text-gray-900  dark:text-[#CCFFFF]">
                                Connect
                            </h3>
                            <div className="mt-6 space-y-4">
                                {navigation.connect.map((item) => (
                                    <div key={item.name}>
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-500 hover:dark:text-gray-200"
                                        >
                                            {item.name}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-[#CCFFFF]">
                                    Company
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <div key={item.name}>
                                            <a
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-500 hover:dark:text-gray-200"
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-900/10 pt-2 sm:mt-5 dark:border-gray-100/10">
                    <p className="text-xs leading-5 text-gray-700 dark:text-[#CCFFFF]">
                        &copy; 2024 AlgoCode. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;