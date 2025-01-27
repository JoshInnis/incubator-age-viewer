/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Currently works AGENS / AGE ( in-progress )
import * as path from "path";
import fs from 'fs'
import Flavors from "../config/Flavors";

const sqlBasePath = path.join(__dirname, '../../sql');

// todo: util.format -> ejs
function getQuery(flavor = Flavors.AGENS, name) {
    const defaultSqlPath = path.join(sqlBasePath, `./${name}/default.sql`);
    let sqlPath = path.join(sqlBasePath, `./${name}/${flavor}.sql`);
    if (fs.existsSync(defaultSqlPath)) {
        sqlPath = defaultSqlPath;
    }
    if (!fs.existsSync(sqlPath)) {
        throw new Error(`SQL is not exist, name = ${name}`);
    }
    return fs.readFileSync(sqlPath, 'utf8');
}

export {getQuery}
