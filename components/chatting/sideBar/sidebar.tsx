'use client';

import TextWithIcon from '@/components/UI/text-with-icon';
import React, { useState, useEffect } from 'react';
import CheckBoxCardGroup from './checkbox-group';
import Image from 'next/image';
import TimerBlock from './timer-block';

export const options = [
  {
    id: 'option1',
    title: 'وكيل ال intake',
    description:
      'يتم تقييم حالتك وتحليل إجابتك بناء لتبدأ المراحل التالية من الجلسة',
  },
  {
    id: 'option2',
    title: 'وكيل المشاعر',
    description:
      'يتم تقييم مشاعرك وإظهار اهتمام بالتفاصيل وتقديم حلول للحالة النفسية',
  },
  {
    id: 'option3',
    title: 'وكيل ال mental coach',
    description:
      'يتم عمل تقييم وإرشاد للحالات والخطوات التي يجب على المستخدم اتباعها للوصول إلى مرحلة التعافي والعلاج',
  },
  // {
  //   id: 'option4',
  //   title: 'وكيل ال mental coach',
  //   description:
  //     'يتم عمل تقييم وإرشاد للحالات والخطوات التي يجب على المستخدم اتباعها للوصول إلى مرحلة التعافي والعلاج',
  // },
  // {
  //   id: 'option5',
  //   title: 'وكيل ال mental coach',
  //   description:
  //     'يتم عمل تقييم وإرشاد للحالات والخطوات التي يجب على المستخدم اتباعها للوصول إلى مرحلة التعافي والعلاج',
  // },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile or tablet size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`bg-white border-l border-gray-200 h-full overflow-y-auto transition-all duration-300 md:block z-30 scrollbar-hide ${
          isMobile ? '' : ''
        } ${
          isOpen
            ? isMobile
              ? 'w-full max-w-[100%] right-0 fixed'
              : 'w-[30%]'
            : 'xl:w-[5.6875rem] w-[3.75rem]'
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`${
            isOpen ? 'p-10 h-auto gap-14' : 'xl:px-4 xl:py-12 px-2 py-6 h-full'
          } flex flex-col justify-between`}
        >
          {isOpen ? (
            <div
              className="flex justify-between items-center w-full"
              onClick={toggleSidebar}
            >
              <TextWithIcon
                textContent="مرحبًا محمود"
                srcImage="/images/arrow-right-black.svg"
                className="!text-[2.125rem] font-medium !justify-between w-full"
                sizeImage={24}
              />
            </div>
          ) : (
            <div
              className="flex justify-center cursor-pointer"
              onClick={toggleSidebar}
            >
              <Image
                src="/images/burger.svg"
                alt="Toggle menu"
                width={24}
                height={24}
              />
            </div>
          )}

          {isMobile && isOpen && (
            <div className="items-center gap-4 flex flex-col">
              <button className="px-5 py-2.5 cursor-pointer">
                <TextWithIcon
                  textContent="مساعدة"
                  srcImage="/images/help-circle.svg"
                  className="text-base text-[#767676] flex-row-reverse"
                />
              </button>
              <button className="px-5 py-2.5 cursor-pointer">
                <TextWithIcon
                  textContent="ترقية الخطة"
                  srcImage="/images/lighting.svg"
                  className="text-base text-[#D69D0B] flex-row-reverse"
                />
              </button>
              <div className="border-1 border-[#E8E8E8] rounded-lg p-1">
                <button className="bg-[#FB7185] p-2 rounded-lg hover:text-gray-900 w-[10.0625rem] cursor-pointer">
                  <TextWithIcon
                    textContent="إنهاء المحادثة"
                    srcImage="/images/segment.svg"
                    className="text-sm text-white"
                  />
                </button>
              </div>
            </div>
          )}

          <div className={`${isOpen ? 'space-y-8' : 'mt-8'}`}>
            {isOpen && (
              <p className="w-full text-right text-2xl font-medium">
                المختص الحالي
              </p>
            )}
            {/* List of previous conversations */}
            <div className="space-y-2">
              <CheckBoxCardGroup
                options={options}
                defaultSelected="option1"
                isCollapsed={!isOpen}
              />
            </div>
          </div>
          {/* Add the timer block component */}
          <TimerBlock isCollapsed={!isOpen} />
        </div>
      </aside>
    </>
  );
}
