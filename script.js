document.getElementById('employee-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const employeeName = document.getElementById('employee-name').value;
    const employeeRole = document.getElementById('employee-role').value;
    const employeeHireDate = document.getElementById('employee-hire-date').value;

    if (isEmployeeExists(employeeName)) {
        alert('Esse funcionário já está cadastrado.');
        return;
    }

    const employee = {
        name: employeeName,
        role: employeeRole,
        hireDate: employeeHireDate
    };

    addEmployeeToLocalStorage(employee);
    renderEmployees();
    this.reset(); // Limpa o formulário
});

function isEmployeeExists(name) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    return employees.some(emp => emp.name.toLowerCase() === name.toLowerCase());
}

function addEmployeeToLocalStorage(employee) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
}

function renderEmployees() {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeesList = document.getElementById('employees');
    employeesList.innerHTML = '';

    employees.forEach((employee, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${new Date(employee.hireDate).toLocaleDateString('pt-BR')}</td>
            <td>
                <button onclick="editEmployee(${index})">Editar</button>
                <button onclick="deleteEmployee(${index})">Excluir</button>
            </td>
        `;
        employeesList.appendChild(tr);
    });
}

function deleteEmployee(index) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployees();
}

function editEmployee(index) {
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees[index];
    
    document.getElementById('employee-name').value = employee.name;
    document.getElementById('employee-role').value = employee.role;
    document.getElementById('employee-hire-date').value = employee.hireDate;

    // Exclui o funcionário enquanto edita
    deleteEmployee(index);
}

function searchEmployees() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(searchInput));
    displayEmployees(filteredEmployees);
}

function filterEmployees() {
    const filterRole = document.getElementById('filter-role').value;
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const filteredEmployees = filterRole ? employees.filter(employee => employee.role === filterRole) : employees;
    displayEmployees(filteredEmployees);
}

function displayEmployees(employees) {
    const employeesList = document.getElementById('employees');
    employeesList.innerHTML = '';

    employees.forEach((employee, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.role}</td>
            <td>${new Date(employee.hireDate).toLocaleDateString('pt-BR')}</td>
            <td>
                <button onclick="editEmployee(${index})">Editar</button>
                <button onclick="deleteEmployee(${index})">Excluir</button>
            </td>
        `;
        employeesList.appendChild(tr);
    });
}

// Renderiza os funcionários ao carregar a página
document.addEventListener('DOMContentLoaded', renderEmployees);
