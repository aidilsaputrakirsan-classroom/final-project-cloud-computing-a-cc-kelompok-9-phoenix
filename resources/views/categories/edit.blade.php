<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Category') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6">
                    <!-- Preview Card -->
                    <div class="mb-6 p-4 border-2 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                        <div class="flex items-center gap-3" id="preview">
                            <span id="preview-icon" class="text-3xl">{{ $category->icon ?? '📁' }}</span>
                            <div class="flex items-center gap-2">
                                <span id="preview-color" class="w-4 h-4 rounded-full" style="background-color: {{ $category->color }}"></span>
                                <span id="preview-name" class="font-semibold text-gray-900 dark:text-gray-100">{{ $category->name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Edit Form -->
                    <form method="POST" action="{{ route('categories.update', $category) }}">
                        @csrf
                        @method('PUT')

                        <div class="mb-6">
                            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Category Name <span class="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                value="{{ old('name', $category->name) }}" 
                                required
                                class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                oninput="updatePreview()">
                            @error('name')
                                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="color" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Color <span class="text-red-500">*</span>
                            </label>
                            <div class="flex gap-4 items-center">
                                <input 
                                    type="color" 
                                    name="color" 
                                    id="color" 
                                    value="{{ old('color', $category->color) }}" 
                                    required
                                    class="h-12 w-24 rounded-md border-gray-300 dark:border-gray-700 cursor-pointer"
                                    oninput="updatePreview()">
                                <input 
                                    type="text" 
                                    id="color-hex" 
                                    value="{{ old('color', $category->color) }}" 
                                    readonly
                                    class="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 bg-gray-100">
                            </div>
                            @error('color')
                                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label for="icon" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Icon (Emoji)
                            </label>
                            <input 
                                type="text" 
                                name="icon" 
                                id="icon" 
                                value="{{ old('icon', $category->icon) }}" 
                                placeholder="📁 💼 🏠 🛒 ❤️ 📚"
                                maxlength="10"
                                class="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                oninput="updatePreview()">
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Use emoji or leave empty. Examples: 📁 💼 🏠 🛒 ❤️ 📚 🎮 🎨 ✈️
                            </p>
                            @error('icon')
                                <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="flex gap-4">
                            <button 
                                type="submit" 
                                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-150">
                                Update Category
                            </button>
                            <a 
                                href="{{ route('categories.index') }}" 
                                class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-150">
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function updatePreview() {
            const name = document.getElementById('name').value || 'Category Name';
            const color = document.getElementById('color').value;
            const icon = document.getElementById('icon').value || '📁';

            document.getElementById('preview-name').textContent = name;
            document.getElementById('preview-color').style.backgroundColor = color;
            document.getElementById('preview-icon').textContent = icon;
            document.getElementById('color-hex').value = color.toUpperCase();
        }

        // Update hex display on load
        document.getElementById('color').addEventListener('input', function() {
            document.getElementById('color-hex').value = this.value.toUpperCase();
        });
    </script>
</x-app-layout>
