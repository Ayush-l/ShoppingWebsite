'use client'
import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { ProductWrapper } from './ProductWrapper'
import { useLocation, useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';






const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: false },
    ],
  },
]
const discount={
  id: 'DiscountRange',
  name: 'Discount Range',
  options: [
    { value: 'ZeroToTen', label: '0-10%', checked: false },
    { value: 'TenTOTwenty', label: '10-20%', checked: false },
    { value: 'TwentyToThirty', label: '20-30%', checked: false },
    { value: 'ThirtyToFourty', label: '30-40%', checked: false },
    { value: 'FourtyToFifty', label: '40-50%', checked: false },
    { value: 'FiftyToSixty', label: '50-60%', checked: false },
    { value: 'SixtyToSeventy', label: '60-70%', checked: false },
    { value: 'SeventyToEighty', label: '70-80%', checked: false },
    { value: 'EightyToNinety', label: '80-90%', checked: false },
    { value: 'NinetyToHundred', label: '90-100%', checked: false },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Product=()=> {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const location=useLocation();
  const navigate=useNavigate();

  const handleFilter=(value,sectionId)=>{
    const searchParams=new URLSearchParams(location.search)
    let filterValue=searchParams.getAll(sectionId)
    if(filterValue.length>0&&filterValue[0].split(",").includes(value)){
      filterValue=filterValue[0].split(",").filter((item)=>item!==value);
      if(filterValue.length===0){
        searchParams.delete(sectionId);
      }
      else{
        searchParams.set(sectionId, filterValue.join(","));
      }
    }
    else{
      filterValue.push(value);
      searchParams.set(sectionId,filterValue.join(','))
    }
    navigate({search:`${searchParams.toString()}`})
  }
  
  const handleRadioFilterChange=(event,sectionId)=>{
    const searchParams=new URLSearchParams(location.search)
    searchParams.delete(sectionId)
    searchParams.set(sectionId,event.target.value)
    navigate({search:`${searchParams.toString()}`})
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="overflow-hidden relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-72 mx-6 items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  onChange={(e)=>handleFilter(e.target.value,section.id)}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                <Disclosure key={discount.id} as="div" className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">{discount.name}</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                        <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                      <FormControl key={discount.id || index}>
                        <RadioGroup
                          aria-labelledby={discount.id}
                          defaultValue={discount.options[0]?.value || ""}
                          name={`radio-group`}
                        >
                          {discount.options.map((option, idx) => (
                            <FormControlLabel
                            key={option.value || idx}
                            onChange={(e)=>handleRadioFilterChange(e,discount.id)}
                            value={option.value}
                            control={<Radio />}
                            label={option.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </DisclosurePanel>
                </Disclosure>
            
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="px-10"> 
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() =>{
                  setMobileFiltersOpen(true)
                }}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <div>  
                <form className="hidden lg:block">
                  <div className="flex gap-3">
                    <div className="flex h-5 shrink-0 items-center">
                      <div className="group grid size-4 w-50 grid-cols-1">
                        {filters.map((section) => (
                          <Disclosure key={section.id} as="div" className="border-t border-gray-200 py-6 w-50">
                            <h3 className="-mx-2 -my-3 flow-root">
                              <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                  <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex gap-3">
                                    <div className="flex h-5 shrink-0 items-center">
                                      <div className="group grid size-4 grid-cols-1">
                                        <input
                                          defaultValue={option.value}
                                          defaultChecked={option.checked}
                                          id={`filter-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          type="checkbox"
                                          onChange={(e)=>handleFilter(e.target.value,section.id)}
                                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                          fill="none"
                                          viewBox="0 0 14 14"
                                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                        >
                                          <path
                                            d="M3 8L6 11L11 3.5"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-0 group-has-checked:opacity-100"
                                          />
                                          <path
                                            d="M3 7H11"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                    <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </Disclosure>
                        ))}
                          <Disclosure key={discount.id} as="div" className="border-t border-b border-gray-200 py-6">
                            <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{discount.name}</span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                              </span>
                            </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <FormControl key={discount.id || index}>
                                <RadioGroup
                                  aria-labelledby={discount.id}
                                  defaultValue={discount.options[0]?.value || ""}
                                  name={`radio-group`}
                                >
                                  {discount.options.map((option, idx) => (
                                    <FormControlLabel
                                    onChange={(e)=>handleRadioFilterChange(e,discount.id)}
                                    key={option.value || idx}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </DisclosurePanel>
                          </Disclosure>
                      </div>
                    </div>
                  </div>

                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4"><ProductWrapper/></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
export default Product