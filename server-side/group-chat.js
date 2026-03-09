// DOM Elements
const searchInput = document.getElementById('searchGroups');
const filterSelect = document.getElementById('filterTopic');
const groupList = document.querySelector('.group-list');
const groupItems = document.querySelectorAll('.group-item');

// Store original groups for filtering
let originalGroups = Array.from(groupItems);

// Search functionality
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter groups based on search term
    const filteredGroups = originalGroups.filter(group => {
        const groupName = group.querySelector('.group-info h3').textContent.toLowerCase();
        const groupDescription = group.querySelector('.group-info p').textContent.toLowerCase();
        
        return groupName.includes(searchTerm) || groupDescription.includes(searchTerm);
    });
    
    // Update the display
    updateGroupDisplay(filteredGroups);
});

// Filter functionality
filterSelect.addEventListener('change', function(e) {
    const selectedTopic = e.target.value;
    
    // Filter groups based on selected topic
    let filteredGroups = originalGroups;
    
    if (selectedTopic !== 'all') {
        filteredGroups = originalGroups.filter(group => {
            const groupTopic = group.getAttribute('data-topic');
            return groupTopic === selectedTopic;
        });
    }
    
    // Update the display
    updateGroupDisplay(filteredGroups);
});

// Function to update group display
function updateGroupDisplay(groups) {
    // Clear current display
    groupList.innerHTML = '';
    
    if (groups.length === 0) {
        // Show no results message
        groupList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No groups found</p>
            </div>
        `;
        return;
    }
    
    // Add filtered groups
    groups.forEach(group => {
        groupList.appendChild(group.cloneNode(true));
    });
    
    // Reattach event listeners to new elements
    attachGroupEventListeners();
}

// Function to attach event listeners to group items
function attachGroupEventListeners() {
    const newGroupItems = document.querySelectorAll('.group-item');
    
    newGroupItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all groups
            newGroupItems.forEach(group => group.classList.remove('active'));
            
            // Add active class to clicked group
            this.classList.add('active');
            
            // Update chat header with group info
            updateChatHeader(this);
        });
    });
}

// Function to update chat header
function updateChatHeader(selectedGroup) {
    const groupName = selectedGroup.querySelector('.group-info h3').textContent;
    const groupAvatar = selectedGroup.querySelector('.group-avatar i').className;
    
    // Update header content
    document.querySelector('.chat-header .group-avatar i').className = groupAvatar;
    document.querySelector('.chat-header h2').textContent = groupName;
}

// Initialize event listeners
attachGroupEventListeners();

// Add responsive behavior for mobile
function handleMobileView() {
    const chatContainer = document.querySelector('.chat-container');
    const chatSidebar = document.querySelector('.chat-sidebar');
    const chatMain = document.querySelector('.chat-main');
    
    if (window.innerWidth <= 768) {
        // Mobile view
        chatContainer.classList.add('mobile-view');
        
        // Show/hide sidebar based on group selection
        const groupItems = document.querySelectorAll('.group-item');
        groupItems.forEach(item => {
            item.addEventListener('click', () => {
                chatSidebar.style.display = 'none';
                chatMain.style.display = 'flex';
            });
        });
        
        // Add back button to return to sidebar
        const chatHeader = document.querySelector('.chat-header');
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
        backButton.setAttribute('title', 'Back to groups');
        chatHeader.insertBefore(backButton, chatHeader.firstChild);
        
        backButton.addEventListener('click', () => {
            chatSidebar.style.display = 'flex';
            chatMain.style.display = 'none';
        });
    } else {
        // Desktop view
        chatContainer.classList.remove('mobile-view');
        chatSidebar.style.display = 'flex';
        chatMain.style.display = 'flex';
    }
}

// Handle window resize
window.addEventListener('resize', handleMobileView);

// Initial call
handleMobileView(); 