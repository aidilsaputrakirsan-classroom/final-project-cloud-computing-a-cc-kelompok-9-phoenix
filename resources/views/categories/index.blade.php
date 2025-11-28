<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Categories') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <!-- Create Category Form -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mb-6">
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Create New Category</h3>
                    <form method="POST" action="{{ route('categories.store') }}" class="flex flex-wrap gap-4 items-end">
                        @csrf
                        <div class="flex-1 min-w-[200px]">
                            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                            <input type="text" name="name" id="name" value="{{ old('name') }}" required
                                class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            @error('name')
                                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        <div class="w-32">
                            <label for="color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                            <input type="color" name="color" id="color" value="{{ old('color', '#3b82f6') }}" required
                                class="w-full h-10 rounded-md border-gray-300 dark:border-gray-700 cursor-pointer">
                            @error('color')
                                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        <div class="flex-1 min-w-[150px]">
                            <label for="icon" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Icon (emoji)</label>
                            <input type="text" name="icon" id="icon" value="{{ old('icon') }}" placeholder="📁"
                                class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            @error('icon')
                                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-150">
                            Create
                        </button>
                    </form>
                </div>
            </div>

            <!-- Categories List -->
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Categories</h3>
                    
                    @if($categories->count() > 0)
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            @foreach($categories as $category)
                                <div class="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition duration-200">
                                    <div class="flex justify-between items-start mb-3">
                                        <div class="flex items-center gap-3 flex-1">
                                            @if($category->icon)
                                                <span class="text-3xl">{{ $category->icon }}</span>
                                            @endif
                                            <div>
                                                <div class="flex items-center gap-2 mb-1">
                                                    <span class="w-4 h-4 rounded-full" style="background-color: {{ $category->color }}"></span>
                                                    <h4 class="font-semibold text-gray-900 dark:text-gray-100">{{ $category->name }}</h4>
                                                </div>
                                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                                    {{ $category->tasks_count }} {{ Str::plural('task', $category->tasks_count) }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="flex gap-2 pt-3 border-t dark:border-gray-700">
                                        <a href="{{ route('categories.edit', $category) }}" 
                                            class="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded transition duration-150">
                                            Edit
                                        </a>
                                        <form method="POST" action="{{ route('categories.destroy', $category) }}" 
                                            onsubmit="return confirm('Delete this category? Tasks will remain but lose their category.');" 
                                            class="flex-1">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" 
                                                class="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded transition duration-150">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @else
                        <div class="text-center py-12">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                            <p class="mt-2 text-gray-500 dark:text-gray-400">No categories yet. Create your first category above!</p>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
