<?php
$container->setParameter('mongo.host', getenv('MONGO_HOST'));
$container->setParameter('mongo.database', getenv('MONGO_DATABASE'));