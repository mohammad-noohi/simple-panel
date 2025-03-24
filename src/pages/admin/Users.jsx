import { useEffect, useState } from "react";
// react bootstrap
import { Table, Modal, Button, Form } from "react-bootstrap";
// icons
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

function Users() {
  /* State */
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [getData, setGetData] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  /* Lifecycles */
  useEffect(() => {
    (async function () {
      await fetch("https://train-react-159d4-default-rtdb.firebaseio.com/users.json")
        .then(resp => resp.json())
        .then(data => {
          if (data) {
            setUsers(Object.entries(data));
          }
        });
    })();
  }, [getData]);

  useEffect(() => {
    const mainUser = users.find(user => user[0] === userId);
    if (mainUser) {
      setFirstName(mainUser[1].firstName);
      setLastName(mainUser[1].lastName);
      setEmail(mainUser[1].email);
    }
  }, [userId]);

  /* Actions & Events */
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const deleteUser = async () => {
    await fetch(`https://train-react-159d4-default-rtdb.firebaseio.com/users/${userId}.json`, {
      method: "DELETE",
    });

    setShowDeleteModal(false);
    setGetData(prev => !prev); // just change the state no matter the value
  };

  const editUser = async e => {
    e.preventDefault();

    const newUserInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    await fetch(`https://train-react-159d4-default-rtdb.firebaseio.com/users/${userId}.json`, {
      method: "PUT",
      body: JSON.stringify(newUserInfo),
    });

    setGetData(prev => !prev);
    closeEditModal();
  };

  /* JSX Template */
  return (
    <div className="shadow rounded p-3 min-vh-100">
      <h1 className="text-capitalize">users table data</h1>
      <Table className="mt-4 text-center text-nowrap" responsive striped>
        <thead>
          <tr>
            <th className="text-capitalize">number</th>
            <th className="text-capitalize">first name</th>
            <th className="text-capitalize">last name</th>
            <th className="text-capitalize">email</th>
            <th className="text-capitalize text-start">actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user[0]}>
              <td>{index + 1}</td>
              <td>{user[1].firstName}</td>
              <td>{user[1].lastName}</td>
              <td>{user[1].email}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning text-uppercase"
                    onClick={() => {
                      setShowEditModal(true);
                      setUserId(user[0]);
                    }}>
                    <FaRegEdit style={{ verticalAlign: "start" }} />
                  </button>
                  <button
                    className="btn btn-danger text-uppercase"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setUserId(user[0]);
                    }}>
                    <FaRegTrashCan style={{ verticalAlign: "start" }} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Remove User Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user ??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            cancel
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={event => editUser(event)}>
            <Form.Group>
              <Form.Control type="text" placeholder="firstname" value={firstName} onChange={event => setFirstName(event.target.value)} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Control type="text" placeholder="lastname" value={lastName} onChange={event => setLastName(event.target.value)} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Control type="email" placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
            </Form.Group>

            <Form.Group className="mt-3">
              <Button type="submit" variant="success">
                edit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;

/* 

1. چرا برای نمایش اطلاعات کاربر توی مدال ادیت اومدین و از یه استیت دیگه استفاده کردید درصورتی که میتونستید صرفا به صورتی دستی این کارو انجام بدید ؟

<button
  className="btn btn-warning text-uppercase"
  onClick={() => {
    setShowEditModal(true);
    setUserId(user[0]);
    const mainUser = users.find( user => user[0] === userId)

    if(mainUser){
      setFirstName(mainUser[1].firstName);
      setLastName(mainUser[1].lastName);
      setEmail(mainUser[1].email);
    }
  }}>
  <FaRegEdit style={{ verticalAlign: "start" }} />
</button>

اینطوری حتی دیگه نیازی به استفاده مجدد از یوزافکت برای یوزر ایدی نبود


2. متوجه نشدم چرا یه استیت دیگه برای مدیریت تغییر دیتاهای کاربران ایجاد کردید و چرا از خود استیت یوزرز استفاده نکردید به جای اینکه از گت دیتا استفاده کنید ؟؟

میشد اینجوری نوشت و یه چیزی که برام جالب بود وقتی فقط اینجوری مینوشتیم بدون اینکه حتی دستی نیاز باشه مقدار یوزرز رو اپدیت کنیم خودش انگار اپدیت میشد و خب البته نفهمیدم چرا اینجوری میشد یعنی انتظار داشتم بعد از اینکه مثلا از متد فیلتر استفاده کردم و مقدار استیت یوزرز رو تغییر بدم این کد اپدیت اجرا بشه ولی بدون نیاز به این کار این تابع زیر دوباره اجرا میشد میشه این رو هم توضیح بدید ؟

useEffect(() => {
  (async function () {
    await fetch("https://train-react-159d4-default-rtdb.firebaseio.com/users.json")
      .then(resp => resp.json())
      .then(data => {
        if (data) {
          setUsers(Object.entries(data));
        }
      });
  })();
}, [users]);

3. توی ذهنم سوال بود که نحوه ی استفاده از فونت های اکسترنال به چه صورت است ؟

4. سوال دیگه ام اینه که آیا ساختار پروژه ی من به درستی انجام شده یا نه و اگر ایرادی یا پیشنهادی دارین ممنون میشم

5. و مورد بعدی اینکه من توی استفاده از ری اکت روتر از روش مدرن ترش استفاده کردم و با روش استاد یکمی متفاوت تره و میخواستم روت بندی رو هم یه نگاه بندازین و اگر ایرادی یا نکته ای هست بهم بگید ممون


6. یه سوال توی ذهنم هست البته توی این پروژه بهش برخورد نکردم ولی توی فکر بود که ما میام و یه سری مواقع یه تابع رو به عنوان یه پراپ به یه کامپوننت دیگه پاس میدیم و اونجا ازش استفاده میکنیم چون استیت داره توی کامپوننت مادر مدیریت میشه اما سوالی که هست که اگر این تودرتویی کامپوننت ها مثلا چندتا لایه مثلا ۳ الی ۴ تا لایه تو در تو بشه ما هر دفعه باید این متد رو از کامپوننت بالایی به کامپوننت پایینی با استفاده از پراپ پاس بدیم ؟ به نظرم خیلی این حرکت جالب نیست و احتمالا یه راه حل دیگه ای هست ولی من بلد نیستم و خب این اتفاق دست ما رو توی کامپوننت بندی محدود میکنه




*/
