# Timension – Objectives and Epics List

**Total Budget: 300 PD (Person Days)**

---

## Project Overview

- **Time tracking application** for software development companies
- **5 user roles**: Employee, Project Manager, Administrator, Controller, Customer
- **3-tier project hierarchy**: Project → Work Package → Task
- **Hourly rate matrix** per project (activity type × qualification level)
- **Automatic month-end lock** with correction request workflow
- **Budget management** (hours + costs) on all hierarchy levels with 80% warning threshold
- **Customer portal** with restricted view on project times and invoices
- **In-app and email notifications** for budget warnings
- **Dashboards** for employees, project managers, and controllers
- **Export capabilities**: PDF invoices, CSV/Excel reports

---

## 1 Objective: Technical Foundation and Infrastructure (45 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 1.1 | Epic: Project Setup, Build System and CI/CD Pipeline | 6 PD |
| 1.2 | Epic: Database Design and Migration Framework | 8 PD |
| 1.3 | Epic: Backend REST API Core Structure | 8 PD |
| 1.4 | Epic: Frontend Framework and Base UI Components | 8 PD |
| 1.5 | Epic: Authentication and Session Management | 8 PD |
| 1.6 | Epic: Security Implementation (HTTPS, Validation, CORS) | 7 PD |

---

## 2 Objective: User Management and Role System (42 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 2.1 | Epic: User CRUD (Backend and Frontend) | 8 PD |
| 2.2 | Epic: Role System and Authorization Logic | 8 PD |
| 2.3 | Epic: Password Management and Policies | 5 PD |
| 2.4 | Epic: User Profiles and Personal Settings | 6 PD |
| 2.5 | Epic: Admin Interface for User Management | 7 PD |
| 2.6 | Epic: Audit Trail for User Actions | 8 PD |

---

## 3 Objective: Master Data and Customer Management (38 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 3.1 | Epic: Activity Types Management | 6 PD |
| 3.2 | Epic: Qualification Levels Management | 6 PD |
| 3.3 | Epic: Customer Master Data Management | 7 PD |
| 3.4 | Epic: Customer Users and Portal Access | 7 PD |
| 3.5 | Epic: System Settings and Configuration | 6 PD |
| 3.6 | Epic: Master Data Import and Export | 6 PD |

---

## 4 Objective: Project Management (47 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 4.1 | Epic: Project CRUD and Base Configuration | 8 PD |
| 4.2 | Epic: Work Package Management | 6 PD |
| 4.3 | Epic: Task Management | 6 PD |
| 4.4 | Epic: Employee Project Assignment | 7 PD |
| 4.5 | Epic: Hourly Rate Matrix per Project | 8 PD |
| 4.6 | Epic: Project Overview with Filter and Search | 6 PD |
| 4.7 | Epic: Project Status Management | 6 PD |

---

## 5 Objective: Time Tracking (47 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 5.1 | Epic: Time Entry Form with Validation | 8 PD |
| 5.2 | Epic: Daily and Weekly Overview | 7 PD |
| 5.3 | Epic: Booking Rules Engine | 6 PD |
| 5.4 | Epic: Automatic Month-End Lock | 6 PD |
| 5.5 | Epic: Correction Request Workflow | 8 PD |
| 5.6 | Epic: Booking History and Audit Trail | 6 PD |
| 5.7 | Epic: Personal Time Overview and Statistics | 6 PD |

---

## 6 Objective: Budget Management and Notifications (40 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 6.1 | Epic: Budget Definition (Project, Work Package, Task Level) | 8 PD |
| 6.2 | Epic: Budget Monitoring and Real-Time Calculation | 8 PD |
| 6.3 | Epic: In-App Notification System | 8 PD |
| 6.4 | Epic: Email Notification Service | 8 PD |
| 6.5 | Epic: Budget Overview and Warning Indicators | 8 PD |

---

## 7 Objective: Reporting, Dashboards and Billing (41 PD)

| No. | Title | Effort |
|-----|-------|--------|
| 7.1 | Epic: Employee Dashboard | 6 PD |
| 7.2 | Epic: Project Manager Dashboard | 7 PD |
| 7.3 | Epic: Controller Dashboard | 7 PD |
| 7.4 | Epic: Project Time Reports and Analytics | 7 PD |
| 7.5 | Epic: Invoice Generation and Management | 8 PD |
| 7.6 | Epic: Data Export (PDF, CSV, Excel) | 6 PD |

---

## Summary

| Objective | Title | Effort | Epics |
|-----------|-------|--------|-------|
| 1 | Technical Foundation and Infrastructure | 45 PD | 6 |
| 2 | User Management and Role System | 42 PD | 6 |
| 3 | Master Data and Customer Management | 38 PD | 6 |
| 4 | Project Management | 47 PD | 7 |
| 5 | Time Tracking | 47 PD | 7 |
| 6 | Budget Management and Notifications | 40 PD | 5 |
| 7 | Reporting, Dashboards and Billing | 41 PD | 6 |
| **Total** | | **300 PD** | **43 Epics** |

---

## Dependencies

```
[1] Technical Foundation
 ├── [2] User Management
 │    └── [3] Master Data
 │         └── [4] Project Management
 │              ├── [5] Time Tracking
 │              │    └── [7] Reporting
 │              └── [6] Budget Management
 │                   └── [7] Reporting
```

**Recommended Sequence:**
1. Objective 1 → 2. Objective 2 → 3. Objective 3 → 4. Objective 4 → 5. Objectives 5+6 (parallel) → 6. Objective 7

---

# Detailed Ticket Descriptions

---

## Objective 4: Project Management – Epic Details

### 4.1 Epic: Project CRUD and Base Configuration (8 PD)

#### Requirements
- Project managers can create, read, update, and delete projects
- Each project has: name, number, type (customer/internal), customer reference, description, start date, planned end date, status, comment-required flag
- Project numbers must be unique and auto-generated with configurable prefix
- Projects can be linked to exactly one customer (for customer projects)
- Only users with project manager or admin role can create/modify projects

#### Technical Solution (modeling, coding)
- Model: `Project` entity with all attributes, relations to `Customer` and `ProjectType`
- Model: Form layouts for project creation and editing in A12
- Model: List view with column configuration in A12
- Code: Backend validation service for unique project number generation
- Code: Authorization check middleware for project manager/admin role

---

### 4.2 Epic: Work Package Management (6 PD)

#### Requirements
- Work packages can be created, edited, and deleted within a project
- Each work package has: name, description, sort order
- Work packages are displayed in defined sort order
- Deleting a work package is only allowed if no time entries exist
- Work packages can be moved between projects (if no bookings exist)

#### Technical Solution (modeling, coding)
- Model: `WorkPackage` entity with parent relation to `Project`
- Model: Nested list/tree view in project detail form in A12
- Model: Drag-and-drop reordering UI in A12
- Code: Deletion validation service checking for existing time entries
- Code: Move validation service for cross-project transfers

---

### 4.3 Epic: Task Management (6 PD)

#### Requirements
- Tasks can be created, edited, and deleted within a work package
- Each task has: name, description, status (open/in progress/done), sort order
- Tasks are displayed in defined sort order within their work package
- Deleting a task is only allowed if no time entries exist
- Task status changes are logged

#### Technical Solution (modeling, coding)
- Model: `Task` entity with parent relation to `WorkPackage`, status enum
- Model: Nested list view within work package in A12
- Model: Status dropdown with visual indicators in A12
- Code: Deletion validation service checking for existing time entries
- Code: Status change audit logging service

---

### 4.4 Epic: Employee Project Assignment (7 PD)

#### Requirements
- Project managers can assign employees to their projects
- Employees only see and can book on projects they are assigned to
- Assignment can have a validity period (from/to date)
- Bulk assignment of multiple employees at once
- Overview of all assigned employees per project

#### Technical Solution (modeling, coding)
- Model: `ProjectAssignment` junction entity with `Project`, `User`, and date range
- Model: Multi-select employee picker in project form in A12
- Model: Assignment list with date filters in A12
- Code: Assignment overlap validation service
- Code: Project visibility filter service based on active assignments

---

### 4.5 Epic: Hourly Rate Matrix per Project (8 PD)

#### Requirements
- Each project has a rate matrix: activity type × qualification level → hourly rate (EUR)
- Rates can be left empty (use system default or mark as non-billable)
- Matrix can be copied from another project as template
- Rate changes only affect future bookings, not existing ones
- Controller can view all rate matrices, project manager only their own

#### Technical Solution (modeling, coding)
- Model: `ProjectRate` entity with composite key (project, activity type, qualification)
- Model: Matrix editor grid component in A12
- Model: Template selection dialog in A12
- Code: Rate matrix copy service with deep clone
- Code: Rate lookup service for billing calculations (point-in-time)
- Code: Authorization filter for rate visibility

---

### 4.6 Epic: Project Overview with Filter and Search (6 PD)

#### Requirements
- List view of all accessible projects with key information
- Filter by: status, type, customer, date range, assigned users
- Full-text search across project name, number, description
- Sortable columns: name, number, status, start date, budget utilization
- Quick actions: open, duplicate, archive

#### Technical Solution (modeling, coding)
- Model: Project list view with configurable columns in A12
- Model: Filter panel with dropdown and date pickers in A12
- Model: Search input with debounce in A12
- Code: Full-text search query builder with indexed fields
- Code: Project duplication service with relation handling

---

### 4.7 Epic: Project Status Management (6 PD)

#### Requirements
- Projects have status: active, paused, completed, archived
- Status transitions follow defined workflow (active→paused→active, active→completed→archived)
- Paused projects: no new bookings allowed, existing data visible
- Completed projects: no new bookings, triggers final billing
- Archived projects: read-only, hidden from default views

#### Technical Solution (modeling, coding)
- Model: Status enum with allowed transitions in A12
- Model: Status change dialog with optional comment in A12
- Model: Visual status badges in list views in A12
- Code: Status transition validation service
- Code: Booking restriction check based on project status

---

## Objective 5: Time Tracking – Epic Details

### 5.1 Epic: Time Entry Form with Validation (8 PD)

#### Requirements
- Employees can enter time bookings with: date, project, work package, task, hours (decimal), activity type, description
- Cascading dropdowns: project → work package → task (only assigned projects visible)
- Validation: positive hours, max 24h per day, required description if project setting enabled
- Quick entry mode: repeat last booking with one click
- Mobile-friendly form layout

#### Technical Solution (modeling, coding)
- Model: `TimeEntry` entity with all attributes and relations
- Model: Booking form with cascading selects in A12
- Model: Responsive form layout for mobile in A12
- Code: Cascading dropdown data provider service
- Code: Booking validation service (hours, date, required fields)
- Code: Last booking clone service for quick entry

---

### 5.2 Epic: Daily and Weekly Overview (7 PD)

#### Requirements
- Calendar-style view showing bookings per day
- Weekly view with daily totals and week total
- Color coding by project or activity type
- Inline editing of existing entries
- Copy booking to another day via drag-and-drop

#### Technical Solution (modeling, coding)
- Model: Calendar grid component with day cells in A12
- Model: Weekly summary row with totals in A12
- Model: Color legend configuration in A12
- Code: Weekly aggregation query service
- Code: Booking copy/move service with date adjustment
- Code: Real-time total calculation on entry changes

---

### 5.3 Epic: Booking Rules Engine (6 PD)

#### Requirements
- Only bookings in current month allowed (configurable grace period)
- Bookings only on assigned projects
- Bookings only on active projects (not paused/completed/archived)
- Future bookings limited to current month
- Warning when daily total exceeds 10 hours

#### Technical Solution (modeling, coding)
- Model: Rule configuration entity for grace period settings
- Model: Warning dialog component in A12
- Code: Booking rules validation service (centralized)
- Code: Date range validation with configurable grace period
- Code: Assignment and project status check service
- Code: Daily total warning threshold check

---

### 5.4 Epic: Automatic Month-End Lock (6 PD)

#### Requirements
- At month end (configurable: last day or first of next month), all bookings become locked
- Locked bookings cannot be edited or deleted by employees
- Lock runs automatically via scheduled job
- Administrators can see lock status per month
- Lock can be temporarily lifted for correction workflow

#### Technical Solution (modeling, coding)
- Model: `MonthLock` entity with year, month, lock date, status
- Model: Lock status indicator in booking views in A12
- Model: Admin lock overview panel in A12
- Code: Scheduled job for automatic month-end locking
- Code: Lock status check service for booking operations
- Code: Temporary unlock service for corrections

---

### 5.5 Epic: Correction Request Workflow (8 PD)

#### Requirements
- Users can request corrections for locked months
- Request contains: affected month, booking details, reason
- Project manager receives notification and can approve/reject
- Approved: user gets temporary edit access for that booking
- Full audit trail: request, approval, changes made

#### Technical Solution (modeling, coding)
- Model: `CorrectionRequest` entity with status workflow
- Model: Request form with booking reference in A12
- Model: Approval inbox for project managers in A12
- Model: Request status timeline view in A12
- Code: Correction request workflow engine
- Code: Temporary unlock token service with expiration
- Code: Correction audit trail logging service

---

### 5.6 Epic: Booking History and Audit Trail (6 PD)

#### Requirements
- All booking changes are logged: create, update, delete
- Log contains: timestamp, user, old values, new values, reason (if correction)
- History viewable per booking and per user
- Audit data retained for 10 years (configurable)
- Export of audit trail for compliance

#### Technical Solution (modeling, coding)
- Model: `TimeEntryAudit` entity with JSON diff storage
- Model: History timeline component in booking detail in A12
- Model: Audit log list with filters in A12
- Code: Audit trail interceptor for all booking operations
- Code: JSON diff generator for old/new value comparison
- Code: Audit export service (CSV/PDF)

---

### 5.7 Epic: Personal Time Overview and Statistics (6 PD)

#### Requirements
- Employee sees own statistics: hours today, this week, this month
- Breakdown by project and activity type
- Comparison to previous periods (week-over-week, month-over-month)
- Missing days indicator (workdays without bookings)
- Exportable personal timesheet

#### Technical Solution (modeling, coding)
- Model: Personal dashboard widgets in A12
- Model: Chart components for time distribution in A12
- Model: Missing days calendar highlight in A12
- Code: Personal statistics aggregation service
- Code: Period comparison calculation service
- Code: Working days calculation service (excluding weekends/holidays)
- Code: Personal timesheet PDF generation

---



# Objective Ticket Examples


## Objective 4: Project Management Module

### Requirements
- **Project Structure:** Manage Projects with a 3-tier hierarchy (Project → Work Packages → Tasks) and unique auto-generated numbers.
- **Access Control:** Assign employees to projects with specific validity periods; restrict visibility to assigned users.
- **Financial Configuration:** Define hourly rate matrices (Activity × Qualification) per project; allow copying from templates.
- **Lifecycle:** Enforce project status transitions (Active/Paused/Completed/Archived) and prevent deletion of elements containing booking data.

### Technical solution (modeling, coding)
- **A12 Modeling:** Define entity hierarchy (`Project`, `WorkPackage`, `Task`) and relations (`Assignment`, `Rate`). Configure list views, nested tree UIs, and forms.
- **Backend Coding:** Implement validation for assignment overlaps and unique numbering. Code "pre-delete" checks for data integrity. Develop logic for deep-copying rate matrices and validating status transitions.

### Estimation
- 47 PD

---

## Objective 5: Time Tracking Module

### Requirements
- **Booking Interface:** Enable time entry with cascading selection (Project → WP → Task) and validation (max 24h/day, mandatory fields).
- **Rules Engine:** Restrict bookings to active, assigned projects within unlocked periods.
- **Closing & Corrections:** Automate month-end locking. Implement a workflow for requesting/approving corrections in locked months.
- **History & Stats:** Maintain a full audit trail of changes. Provide personal dashboards with daily/weekly booking summaries.

### Technical solution (modeling, coding)
- **A12 Modeling:** Define `TimeEntry`, `Lock`, and `CorrectionRequest` entities. Configure Calendar widgets, Dashboard charts, and Correction forms.
- **Backend Coding:** Develop a central validation engine (checking locks, assignments, limits). Implement the scheduled locking job and correction approval logic (temporary unlock). Add interceptors for audit logging and aggregation queries for statistics.

### Estimation
- 47 PD