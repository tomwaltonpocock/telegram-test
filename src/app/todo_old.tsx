import React, { Fragment }  from 'react';
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import todostatus from './labels/todostatus.json' with {type: "json"};

const statuses = todostatus;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Item = ({ project, index }) => (
  <Draggable draggableId={String(project.id)} index={index}>
    {(provided) => (
      <li key={project.id} ref={provided.innerRef} className="flex items-center justify-between gap-x-6 py-5">
        <div className="min-w-0">
          <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900">{project.name}</p>
            <p
              className={classNames(
                statuses[project.status],
                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {project.status}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <p className="whitespace-nowrap">
              Due on <time dateTime={project.dueDateTime}>{project.dueDate}</time>
            </p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p className="truncate">Created by {project.createdBy}</p>
          </div>
        </div>
        <div className="flex flex-none items-center gap-x-4">
          <a
            href={project.href}
            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
          >
            View project<span className="sr-only">, {project.name}</span>
          </a>
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      Edit<span className="sr-only">, {project.name}</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      Move<span className="sr-only">, {project.name}</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900'
                      )}
                    >
                      Delete<span className="sr-only">, {project.name}</span>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </li>
    )}
  </Draggable>
);

export default function ToDo( { items } ) {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = arrayMove(items, result.source.index, result.destination.index);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} role="list" className="divide-y divide-gray-100">
            {items.map((project, index) => {
              console.log('hello this is rendering ' + index + '. The project object is :');
              console.log(project);
              console.log('And so the project ID is ' + project.id);
              console.log('And the provided innerref object is as follows:');
              console.log(provided.innerRef);
              return (
                <Item key={project.id} project={project} index={index} />
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}