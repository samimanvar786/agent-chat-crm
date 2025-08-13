# Agent-CRM System

## 1. Overview
This CRM system manages a network of **Agents** and their **Customers**, supervised by an **Admin**.  
It uses **Next.js** (frontend + API routes) and **Node.js** backend logic.  
**MongoDB** with **Mongoose** is used for database management. Authentication is handled with **NextAuth.js** using **JWT sessions**.

---

## 2. User Roles

### Admin
- Login to system.
- Create and manage Agent accounts.
- View list of all agents and their details.

### Agent
- Login to system.
- Create and manage Customer records.
- Search customers by last digits of phone number.

---

## 3. Entities & Fields

### User (Admin / Agent)
| Field           | Type                         | Required | Notes                               |
|-----------------|------------------------------|----------|-------------------------------------|
| name            | String                       | Yes      |                                     |
| email           | String                       | Yes      | Unique                              |
| password        | String                       | Yes      | Hashed                              |
| phone           | String                       | No       |                                     |
| address         | String                       | No       |                                     |
| commissionRate  | Number                       | No       |                                     |
| role            | Enum('admin','agent')        | No       | Default 'agent'                     |

### Customer
| Field            | Type          | Required | Notes                             |
|------------------|---------------|----------|-----------------------------------|
| name             | String        | Yes      |                                   |
| phone            | String        | Yes      |                                   |
| email            | String        | No       |                                   |
| address          | String        | No       |                                   |
| agentName        | String        | Yes      | Auto-filled from agent account    |
| saleAmount       | Number        | No       |                                   |
| upgradeAmount    | Number        | No       |                                   |
| finalAmount      | Number        | No       |                                   |
| methodOfPayment  | String        | No       |                                   |
| issues           | String        | No       |                                   |
| remarks          | String        | No       |                                   |
| technician       | String        | No       |                                   |
| refund           | Number        | No       |                                   |
| createdBy        | ObjectId(User)| Yes      |                                   |

---

## 4. Use Cases & Scenarios

### Admin
1. Login with email/password.
2. Create Agent accounts.
3. View list of all agents.
4. Manage agents (edit info, disable account – optional future).

### Agent
1. Login with email/password.
2. Create Customer records.
3. Search customers by last digits of phone number.
4. View own customer list.

---

## 5. Database Schema

### User Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String",
  "phone": "String",
  "address": "String",
  "commissionRate": "Number",
  "role": "admin | agent",
  "createdAt": "Date",
  "updatedAt": "Date"
}
