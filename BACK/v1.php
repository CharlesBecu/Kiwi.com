<?php

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, PUT, GET, DELETE');
header('Content-Type: application/json');

require 'methods.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    answer(200, '');
}

$Routing = new Router();

$Routing->addRoute(GET, '', function ($req) {
    header('Location: ../doc/routes');
    exit();
});
$Routing->addRoute(GET, 'ads', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $sql =
        'SELECT `ID`, `START`, `OWNER`, `END`, `TITLE`, `COMPANY`, `LOCATION`, `CONTRACT`, `TAGS`, `SALARY`, `PREVIEW` FROM `JOBAD` WHERE 1';
    /* 
    o => filter:OWNER
    d => sort:END
    t => filter:CONTRACT
    c => filter:COMPANY
    l => filter:LOCATION
    a => filter:TITLE
    n => company name in addition of id
    */
    if (!empty($get)) {
        $filters = '';
        if (isset($get['o'])) {
            $fil = htmlspecialchars($get['o']);
            $filters = $filters . " AND `OWNER`=$fil";
        }
        if (isset($get['l'])) {
            $fil = htmlspecialchars($get['l']);
            $filters = $filters . " AND `LOCATION`='$fil'";
        }
        if (isset($get['t'])) {
            $fil = htmlspecialchars($get['t']);
            $filters = $filters . " AND `CONTRACT`='$fil'";
        }
        if (isset($get['c'])) {
            $fil = htmlspecialchars($get['c']);
            $filters = $filters . " AND `COMPANY`=$fil";
        }
        if (isset($get['a'])) {
            $fil = htmlspecialchars($get['a']);
            if ($fil != 'all') {
                $filters = $filters . " AND TITLE LIKE '%$fil%'";
            }
        }
        $sql = $sql . $filters;

        if (isset($get['d'])) {
            $page = htmlspecialchars($get['d']);
            $sql = $sql . ' ORDER BY END ASC';
        }
        if (isset($get['p'])) {
            $page = htmlspecialchars($get['p']);
            if ($page != 'all') {
                $sql = $sql . ' LIMIT ' . ($page - 1) * 10 . ', 10';
            }
        } else {
            $sql = $sql . ' LIMIT 0, 10';
        }
    }
    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        if (isset($get['n'])) {
            $data['COMPANY'] = getCompanyName($data['COMPANY']);
        }
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404, '');
    }
    answer(200, $adlist);
});
$Routing->addRoute(GET, 'admin\/ads', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $page = empty($get['p']) ? 1 : $get['p'];
    $bdd_reponse = $bdd->query('SELECT `ID`,`START`, `OWNER`, `END`, `TITLE`, `COMPANY`, `LOCATION`, `CONTRACT`, `TAGS`, `SALARY`, `VIEW`, `OPEN`, `APPLICANT`, `CHATS`, `PREVIEW` FROM `JOBAD`' . ' LIMIT ' . ($page - 1) * 20 . ', 20');
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }
    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404, '');
    }
    answer(200, $adlist);
});
$Routing->addRoute(GET, 'admin\/users', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $page = empty($get['p']) ? 1 : $get['p'];
    $bdd_reponse = $bdd->query('SELECT * FROM `USERS`' . ' LIMIT ' . ($page - 1) * 20 . ', 20');
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }
    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404, '');
    }
    answer(200, $adlist);
});
$Routing->addRoute(GET, 'admin\/company', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $page = empty($get['p']) ? 1 : $get['p'];
    $bdd_reponse = $bdd->query('SELECT * FROM `COMPANY`' . ' LIMIT ' . ($page - 1) * 20 . ', 20');
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }
    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404, '');
    }
    answer(200, $adlist);
});
$Routing->addRoute(GET, 'ads\/\d+', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $id = (int) htmlspecialchars(
        preg_replace('/\/?\z/', '', preg_replace('/\A\/?ads\//', '', $req->url))
    );
    $sql =
        'SELECT `ID`, `START`, `OWNER`, `END`, `TITLE`, `COMPANY`, `LOCATION`, `CONTRACT`, `TAGS`, `SALARY`, `PREVIEW` FROM `JOBAD` WHERE `ID`=' .
        $id;

    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        if (isset($get['n'])) {
            $data['COMPANY'] = getCompanyName($data['COMPANY']);
        }
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    count($adlist) != 0
        ? answer(200, $adlist)
        : answer(
            404,
            "Match not found : We couldn't find an ad with the ID : " . $id
        );
});
$Routing->addRoute(POST, 'ads', function ($req) {
    $bdd = connect();
    $post = $req->body;
    $sql =
        "INSERT INTO `JOBAD`(`ID`,`START`, `OWNER`, `END`, `TITLE`, `COMPANY`, `LOCATION`, `CONTRACT`, `TAGS`, `SALARY`, `PREVIEW`, `FULL`, `VIEW`, `OPEN`, `APPLICANT`, `CHATS`) VALUES ('',CURDATE(),:owner,:end,:title,:cId,:loc,:type,:tags,:money,:pre,:full,0,0,'[]','[]')";
    $prep = $bdd->prepare($sql);
    $val = [
        ':owner' => $post->ownerId,
        ':end' => $post->endDate,
        ':title' => $post->title,
        ':cId' => $post->companyId,
        ':loc' => $post->location,
        ':type' => $post->contract,
        ':tags' => json_encode($post->tags),
        ':money' => $post->salary,
        ':pre' => $post->preview,
        ':full' => $post->full,
    ];
    $prep->execute($val) or
        answer(
            400,
            'Sorry, we could not execute this operation. Your entry might be invalid somehow.'
        );
    answer(200, $bdd->lastInsertId());
});
$Routing->addRoute(DELETE, 'ads\/\d+', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $id = (int) htmlspecialchars(
        preg_replace('/\/?\z/', '', preg_replace('/\A\/?ads\//', '', $req->url))
    );
    if (is_int($id)) {
        if ($id > 0) {
            $sql = 'DELETE FROM `JOBAD` WHERE `ID`=' . $id;
            $bdd->exec($sql) or
                answer(
                    400,
                    'Sorry, we could not execute this operation. Your entry might be invalid somehow. DELETE'
                );
        }
    } else {
        answer(404, 'Ad not found, therefore cannot be deleted.');
    }
});
$Routing->addRoute(GET, 'ads\/\d+\/stats', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $id = (int) htmlspecialchars(
        preg_replace(
            '/\/stats\/?\z/',
            '',
            preg_replace('/\A\/?ads\//', '', $req->url)
        )
    );
    $sql =
        'SELECT `ID`, `VIEW`, `OPEN`, `APPLICANT`, `CHATS` FROM `JOBAD` WHERE `ID`=' .
        $id;

    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    count($adlist) != 0
        ? answer(200, $adlist[0])
        : answer(
            404,
            "Match not found : We couldn't find an ad with the ID : " . $id
        );
});
$Routing->addRoute(POST, 'ads\/\d+\/stats', function ($req) {
    $bdd = connect();
    $post = $req->body;
    $id = (int) htmlspecialchars(
        preg_replace(
            '/\/stats\/?\z/',
            '',
            preg_replace('/\A\/?ads\//', '', $req->url)
        )
    ); // filtre l'url pour récupérer l'id de l'ads
    if ($id < 1) {
        answer(404, 'Invalid ID');
    }
    // On récupère les données
    $sql =
        'SELECT `ID`, `VIEW`, `OPEN`, `APPLICANT`, `CHATS` FROM `JOBAD` WHERE `ID`=' .
        $id;
    $bdd_reponse = $bdd->query($sql);
    $data = $bdd_reponse->fetch(PDO::FETCH_ASSOC);
    $bdd_reponse->closeCursor();

    // On met à jour les donnée
    $sql =
        'UPDATE `JOBAD` SET `VIEW`=:view, `OPEN`=:open, `APPLICANT`=:users, `CHATS`=:convs WHERE `ID`=' .
        $id;
    $prep = $bdd->prepare($sql);

    $vues =
        (int) $data['VIEW'] +
        ((!isset($post->add)
                ? 0
                : isset($post->add->view))
            ? $post->add->view
            : 0);
    $vues =
        $vues -
        ((!isset($post->remove)
                ? 0
                : isset($post->remove->view))
            ? $post->remove->view
            : 0);

    $ouv =
        (int) $data['open'] +
        ((!isset($post->add)
                ? 0
                : isset($post->add->open))
            ? $post->add->open
            : 0);
    $ouv =
        $ouv -
        ((!isset($post->remove)
                ? 0
                : isset($post->remove->open))
            ? $post->remove->open
            : 0);

    $users = json_decode($data['APPLICANT']);
    if (!is_array($users)) {
        $convs = [''];
    }
    if (isset($post->add)) {
        if (isset($post->add->user)) {
            array_push($users, $post->add->user);
        }
    }
    if (isset($post->remove)) {
        if (isset($post->remove->user)) {
            $users = array_diff($users, [$post->remove->user]);
        }
    }
    $users = json_encode(array_merge(array_filter($users)));

    $convs = json_decode($data['CHATS']);
    if (!is_array($convs)) {
        $convs = [''];
    }
    if (isset($post->add)) {
        if (isset($post->add->chats)) {
            array_push($convs, $post->add->chats);
        }
    }
    if (isset($post->remove)) {
        if (isset($post->remove->chats)) {
            $convs = array_diff($convs, [$post->remove->chats]);
        }
    }
    $convs = json_encode(array_merge(array_filter($convs)));

    $val = [
        ':view' => $vues,
        ':open' => $ouv,
        ':users' => count($users) ? $users : '[""]',
        ':convs' => count($convs) ? $convs : '[""]',
    ];
    $prep->execute($val) or
        answer(
            400,
            'Sorry, we could not execute this operation. Your entry might be invalid somehow.'
        );
    answer(200, $post);
});
$Routing->addRoute(GET, 'ads\/\d+\/full', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $id = (int) htmlspecialchars(
        preg_replace(
            '/\/full\/?\z/',
            '',
            preg_replace('/\A\/?ads\//', '', $req->url)
        )
    );
    $sql = 'SELECT `ID`, `FULL` FROM `JOBAD` WHERE `ID`=' . $id;

    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    count($adlist) != 0
        ? answer(200, $adlist[0])
        : answer(
            404,
            "Match not found : We couldn't find an ad with the ID : " . $id
        );
});
$Routing->addRoute(PUT, 'ads\/\d+\/full', function ($req) {
    $bdd = connect();
    $put = $req->body;
    $id = (int) htmlspecialchars(
        preg_replace(
            '/\/full\/?\z/',
            '',
            preg_replace('/\A\/?ads\//', '', $req->url)
        )
    );
    $sql = 'UPDATE `JOBAD` SET `FULL`=:full WHERE `ID`=' . $id;
    $prep = $bdd->prepare($sql);

    $bdd_reponse = $bdd->query($sql);
    if (empty($put)) {
        answer(400, '');
    }
    $prep->execute([':full' => json_encode($put)]) or
        answer(
            400,
            'Sorry, we could not execute this operation. Your entry might be invalid somehow.'
        );
    answer(200, '');
});
$Routing->addRoute(GET, 'ads\/list(\/\d+)+', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $res = htmlspecialchars(
        preg_replace(
            '/\/?\z/',
            '',
            preg_replace('/\A\/?ads\/list\//', '', $req->url)
        )
    );
    $res = explode('/', $res);
    $sql =
        'SELECT `ID`, `START`, `OWNER`, `END`, `TITLE`, `COMPANY`, `LOCATION`, `CONTRACT`, `TAGS`, `SALARY`, `PREVIEW` FROM `JOBAD` WHERE `ID`=0';
    foreach ($res as $r) {
        $sql = $sql . ' OR `ID`=' . ((int) $r);
    }

    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    // answer(200, array($res, $sql, $sql,$adlist));
    count($adlist) != 0
        ? answer(200, $adlist)
        : answer(
            404,
            "Match not found : We couldn't find any ad with these IDs"
        );
});
$Routing->addRoute(POST, 'files\/\d+\/\w+', function ($req) {
    if (isset($_FILES['files']) and $_FILES['file']['error'] == 0) {
        $errors = [];
        $path = 'uploads/';
        $extensions = ['jpg', 'jpeg', 'png', 'pdf'];
        $url = explode('/', $req->url);
        $url = array_merge(array_filter($url));
        $id = htmlspecialchars($url[1]);
        $purpose = htmlspecialchars($url[2]);

        $all_files = count($_FILES['files']['tmp_name']);

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['files']['name'][$i];
            $file_tmp = $_FILES['files']['tmp_name'][$i];
            $file_type = $_FILES['files']['type'][$i];
            $file_size = $_FILES['files']['size'][$i];
            $file_ext = strtolower(
                end(explode('.', $_FILES['files']['name'][$i]))
            );

            $file = $path . $file_ext . '/' . $id . '-' . $file_name;

            if (!in_array($file_ext, $extensions)) {
                answer(
                    401,
                    'Extension not allowed: ' . $file_name . ' ' . $file_type
                );
            }

            if ($file_size > 1000000) {
                answer(
                    401,
                    'File size exceeds limit of 1 Mo: ' .
                        $file_name .
                        ' ' .
                        $file_type
                );
            }

            move_uploaded_file($file_tmp, $file) or answer(500);
        }
        answer(200, 'https://api.job-kiwi.com/' . $file);
    }
    answer(400, 'Yout must submit file to this endpoint');
});
$Routing->addRoute(GET, 'me', function ($req) {
    $token = tokenize($req);
    if($token == null){
        answer(401,"Invalid token");
    }
    $bdd = connect();
    $get = $req->body;
    $id = $token->sub;
    $sql =
    'SELECT `ID`, `LEVEL`, `NAME`, `SURNAME`, `MAIL`, `INTRO`, `NOTIFS`, `CONVS`, `ADS`, `COMPANY`, `FILES`, `VERIFIED` FROM `USERS` WHERE `ID`=' .
    $id;
    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_OBJ)) {
        array_push($adlist, $data);
    }
    
    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404,'');
    }
    answer(200, $adlist[0]);
});
$Routing->addRoute(GET, 'token', function ($req) {
    $bdd = connect();
    $get = $req->body;
    if(empty($get['g']) && empty($get['m']) && empty($get['p'])){
        answer(400,"LOL");
    }
    $sql =
    'SELECT `ID`, `LEVEL`, `MAIL`, `PASSWORD` FROM `USERS` WHERE `VERIFIED` = 0 AND `MAIL`= "'. $get['m'] . '" AND `PASSWORD`= "'. $get['p'] .'"';
    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }
    
    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404,"");
    }else{
        $adlist = $adlist[0];
        $tomorrow = time() + 86400;
        $token = new JWToken();
        // answer(200,$adlist);
        $token->setHeader();
        $token->setPayload($adlist['ID'], $adlist['MAIL'], $adlist['LEVEL'], $tomorrow);
        $token->secret = $adlist['PASSWORD'];
        answer(200,$token->full); 
    }
    answer(200, $adlist);
});
$Routing->addRoute(POST, 'users', function ($req) {
    $bdd = connect();
    $post = $req->body;
    $verified = random_int(100000, 999999);
    $sql =
        "INSERT INTO `USERS`(`ID`, `LEVEL`, `NAME`, `SURNAME`, `MAIL`, `PASSWORD`, `INTRO`, `NOTIFS`, `CONVS`, `ADS`, `COMPANY`, `FILES`, `VERIFIED`) VALUES ('', :level, :name,:firstName, :mail, :password, '', '[]', '[]', '[]', :company, :profil, :verified)";
    $prep = $bdd->prepare($sql);
    $c = !empty($post->company) ? $post->company : null;
    $val = [
        ':name' => ucfirst($post->name),
        ':firstName' => ucfirst($post->firstName),
        ':mail' => $post->mail,
        ':password' => $post->password,
        ':level' => $post->level,
        ':company' => $c,
        ':profil' =>
            '{"profil":"https://emmanuel.nuiro.me/kiwi/FRONT/Img/user.png"}',
        ':verified' => $verified,
    ];

    $prep->execute($val) or
        answer(400, 'Sorry, we could not execute this operation. Your entry might be invalid somehow.');
    $id = $bdd->lastInsertId();
    if(sendValidationMail($post->mail, ucfirst($post->firstName), $verified, $id)){
        if($post->level == 1){
            $sql = 'INSERT INTO `COMPANY`(`WTEAM`) VALUES ('.$id.')';
            $bdd->exec($sql);
        }
        answer(200, $id);
    }else{
        $sql = 'DELETE FROM `JOBAD` WHERE `ID`=' . $id;
        $bdd->exec($sql);
        answer(
            500,
            'Sorry, we have something to fix on our server. Please, try again soon or later.'
        );
    }
});
$Routing->addRoute(GET, 'users\/\d+', function ($req) {
    $bdd = connect();
    $get = $req->body;
    $a = 0;
    $id = (int) htmlspecialchars(
        preg_replace(
            '/\/?\z/',
            '',
            preg_replace('/\A\/?users\//', '', $req->url)
        )
    );
    $sql =
        'SELECT `ID`, `LEVEL`, `NAME`, `SURNAME`, `MAIL`, `INTRO`, `COMPANY`, `FILES` FROM `USERS` WHERE `VERIFIED` = 0 AND`ID` = ' .
        $id;
    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404, 'User not found or not verified');
    }
    answer(200, $adlist);
});
$Routing->addRoute(GET, 'users\/\d+\/validate', function ($req) {

    $bdd = connect();
    $get = $req->body;
    if(empty($get['t'])){answer(400,'');}
    $a = 0;
    $id = (int) htmlspecialchars(
        preg_replace(
            '/\/validate\/?\z/',
            '',
            preg_replace('/\A\/?users\//', '', $req->url)
        )
    );
    $sql =
        'SELECT `ID` FROM `USERS` WHERE `VERIFIED` = ' . (int)$get['t'] . ' AND`ID` = ' .
        $id;
    $bdd_reponse = $bdd->query($sql);
    $adlist = [];
    while ($data = $bdd_reponse->fetch(PDO::FETCH_ASSOC)) {
        array_push($adlist, $data);
    }

    $bdd_reponse->closeCursor();
    if (empty($adlist)) {
        answer(404, 'Invalid link');
    }
    $sql =
        'UPDATE `USERS` SET `VERIFIED` = 0 WHERE `ID` ='.$id ;
        $bdd->exec($sql) or answer(500,"Couldn't validate your accpunt");

    header('Content-Type: text/html');
    header('Refresh: 5;URL=https://job-kiwi.com');
    answerHTML(
        200,
        'Your account is validated. You\'re now ready to applying for a job at <a href="https://job-kiwi.com"> Kiwi.com </a>'
    );
});
/*
header("Refresh: 5;URL=page_suivante.php");
sleep(1);
*/
$Routing->execute(new Requete());

?>
