function setupTheme() {
	const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
	const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
	const themeToggleBtn = document.getElementById('theme-toggle')

	// Set theme and sync with system
	function setThemeAndSync(isDark) {
		// Sync with .dark class
		document.documentElement.classList.toggle('dark', isDark)
		// document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light');
		// Sync with localStorage
		localStorage.setItem('color-theme', isDark ? 'dark' : 'light')
		// Update icons
		themeToggleDarkIcon.classList.toggle('hidden', isDark)
		themeToggleLightIcon.classList.toggle('hidden', !isDark)
	}

	// Read initial system preference
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

	// Initialize theme based on system preference or stored preference
	const storedTheme = localStorage.getItem('color-theme')
	const systemDark = prefersDark.matches

	if (storedTheme) {
		setThemeAndSync(storedTheme === 'dark')
	} else {
		setThemeAndSync(systemDark)
	}

	// Listen for system theme changes
	prefersDark.addEventListener('change', e => {
		setThemeAndSync(e.matches)
	})

	// Handle manual theme toggle
	themeToggleBtn.addEventListener('click', () => {
		const isDark = document.documentElement.classList.contains('dark')
		setThemeAndSync(!isDark)
	})
}

function setupToc() {
	const toc = document.querySelector('#toc')
	if (!toc) return

	const tocToggle = toc.querySelector('#toc-toggle')
	const tocContent = toc.querySelector('.toc-content')
	const minusIcon = toc.querySelector('.toc-expand')
	const plusIcon = toc.querySelector('.toc-collapse')

	if (tocToggle) {
		/*
		hidden 
		*/
		tocToggle.addEventListener('click', function () {
			tocContent.classList.toggle('hidden')
			minusIcon.classList.toggle('hidden')
			plusIcon.classList.toggle('hidden')
			localStorage.setItem('tocState', tocContent.classList.contains('hidden') ? 'hidden' : 'visible')
		})

		const savedState = localStorage.getItem('tocState')
		if (savedState === 'hidden') {
			tocContent.classList.add('hidden')
			minusIcon.classList.add('hidden')
			plusIcon.classList.remove('hidden')
		}
	}
}

function setupTabs() {
	const tabButtons = document.querySelectorAll('.tab-button')
	const tabContents = document.querySelectorAll('.tab-content')
	const tabSelect = document.querySelector('select#Tab')

	function switchTab(tabId) {
		// Hide all tab contents
		tabContents.forEach(content => {
			content.classList.add('hidden')
		})

		// Show selected tab content
		const selectedContent = document.getElementById(tabId)
		if (selectedContent) {
			selectedContent.classList.remove('hidden')
		}

		// Update tab button states
		tabButtons.forEach(button => {
			const isSelected = button.dataset.tab === tabId
			button.setAttribute('aria-selected', isSelected)

			// Remove all state classes first
			/* for tailwind
			border-blue-500 border-transparent
			text-blue-600 dark:text-blue-400
			text-neutral-600 dark:text-neutral-400
			text-neutral-900 dark:text-neutral-300
  			*/
			button.classList.remove(
				'border-blue-500',
				'border-transparent',
				'text-blue-600',
				'dark:text-blue-400',
				'text-neutral-600',
				'dark:text-neutral-400',
			)

			// Apply active or inactive states
			if (isSelected) {
				button.classList.add('border-blue-500', 'text-neutral-900', 'dark:text-neutral-300')
			} else {
				button.classList.add('border-transparent', 'text-neutral-600', 'dark:text-neutral-400')
			}
		})

		// Update mobile select if it exists
		if (tabSelect) {
			tabSelect.value = tabId.charAt(0).toUpperCase() + tabId.slice(1)
		}
	}

	// Handle tab button clicks
	tabButtons.forEach(button => {
		button.addEventListener('click', e => {
			e.preventDefault()
			switchTab(button.dataset.tab)
		})
	})

	// Handle mobile select changes
	if (tabSelect) {
		tabSelect.addEventListener('change', e => {
			switchTab(e.target.value.toLowerCase())
		})
	}

	// Show initial tab
	const initialTab = tabButtons[0]?.dataset.tab
	if (initialTab) {
		switchTab(initialTab)
	}
}

function setupSidebar() {
	const toggleButton = document.getElementById('toggle-sidebar')
	const sidebar = document.getElementById('sidebar')
	const mainContent = document.getElementById('main-content')
	if (!toggleButton || !sidebar || !mainContent) return
	
	toggleButton.addEventListener('click', () => {
		/*
		md:hidden 
		md:col-span-full
		*/
		sidebar.classList.add('md:hidden')
		mainContent.classList.remove('md:col-span-2')
		mainContent.classList.add('md:col-span-full')
	})
}

function init() {
	setupTheme()
	setupToc()
	setupTabs()
	setupSidebar()
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', init)
