const express = require('express')
const router = express.Router()
const uuid = require('uuid')

const members = require('../../Members')

// GETS ALL MEMBERS
router.get('/', (req, res) => {
  res.json(members)
})

// GET SINGLE MEMBER
router.get('/:id', (req, res) => {
  // res.send(req.params.id)
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` })
  }
})

// CREATE MEMBER
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  }
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please give a name and email' })
  }
  members.push(newMember)
  res.json(members)
  // res.redirect('/')
})

// UPDATE MEMBER
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    const updMember = req.body
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name || member.name
        member.email = updMember.email || member.email
        res.json({ msg: 'Member updated', member })
      }
    })
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` })
  }
})

// DELETE MEMBER
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id))
  if (found) {
    res.json({
      msg: `Member with id ${req.params.id} deleted`,
      members: members.filter(member => member.id !== parseInt(req.params.id)),
    })
  } else {
    res.status(400).json({ msg: `No member with id ${req.params.id}` })
  }
})

module.exports = router
